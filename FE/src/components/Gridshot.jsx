import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

const Gridshot = () => {
  const [score, setScore] = useState(0);
  const [missed, setMissed] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameRunning, setGameRunning] = useState(false);

  const canvasRef = useRef(null);
  const crosshairRef = useRef(null);

  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const targetsRef = useRef([]);

  const yawRef = useRef(0);
  const pitchRef = useRef(0);
  const crosshairRadius = 15;
  const maxPitch = Math.PI / 4;
  const minPitch = -Math.PI / 4;

  const scoreRef = useRef(score);
  const missedRef = useRef(missed);
  const hitTimestampsRef = useRef([]);

  useEffect(() => {
    scoreRef.current = score;
    missedRef.current = missed;
  }, [score, missed]);

  useEffect(() => {
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    const scene = sceneRef.current;
    scene.background = new THREE.Color(0x111111);

    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;

    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(10, 20, 20);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const gridHelper = new THREE.GridHelper(40, 40, 0x4444ff, 0x222288);
    gridHelper.rotation.x = Math.PI / 2;
    scene.add(gridHelper);

    const wallMaterial = new THREE.MeshBasicMaterial({
      color: 0x111144,
      wireframe: true,
      opacity: 0.2,
      transparent: true,
    });

    const createWall = (width, height, position, rotation) => {
      const geometry = new THREE.PlaneGeometry(width, height);
      const wall = new THREE.Mesh(geometry, wallMaterial);
      wall.position.set(...position);
      wall.rotation.set(...rotation);
      scene.add(wall);
    };

    createWall(40, 20, [0, 0, -10], [0, 0, 0]);
    createWall(40, 20, [-20, 0, 10], [0, Math.PI / 2, 0]);
    createWall(40, 20, [20, 0, 10], [0, -Math.PI / 2, 0]);
    createWall(40, 40, [0, 10, 10], [Math.PI / 2, 0, 0]);
    createWall(40, 40, [0, -10, 10], [-Math.PI / 2, 0, 0]);

    const animate = () => {
      requestAnimationFrame(animate);
      const pointer = document.pointerLockElement ? new THREE.Vector2(0, 0) : mouseRef.current;
      raycasterRef.current.setFromCamera(pointer, cameraRef.current);
      renderer.render(scene, cameraRef.current);
    };
    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const createTarget = () => {
    if (targetsRef.current.length >= 3) return;

    const geometry = new THREE.SphereGeometry(1.5, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const sphere = new THREE.Mesh(geometry, material);

    const wallWidth = 20;
    const wallHeight = 15;
    sphere.position.set(
      (Math.random() - 0.5) * wallWidth,
      (Math.random() - 0.5) * wallHeight,
      10
    );

    sceneRef.current.add(sphere);
    targetsRef.current.push(sphere);
  };

  const removeTarget = (target) => {
    sceneRef.current.remove(target);
    targetsRef.current = targetsRef.current.filter(t => t !== target);
  };

  const lockPointer = () => {
    const canvas = canvasRef.current;
    if (canvas.requestPointerLock) {
      canvas.requestPointerLock();
      document.body.style.cursor = 'none';
    }
  };

  const unlockPointer = () => {
    if (document.pointerLockElement === canvasRef.current ||
        document.mozPointerLockElement === canvasRef.current) {
      document.exitPointerLock();
      document.body.style.cursor = 'default';
    }
  };

  const startGame = useCallback(() => {
    setScore(0);
    setMissed(0);
    setTimeLeft(30);
    setGameRunning(true);
    hitTimestampsRef.current = [];

    targetsRef.current.forEach(t => sceneRef.current.remove(t));
    targetsRef.current = [];

    yawRef.current = 0;
    pitchRef.current = 0;
    mouseRef.current.set(0, 0);
    if (cameraRef.current) {
      cameraRef.current.rotation.set(0, 0, 0);
    }

    createTarget();
    createTarget();
    createTarget();

    lockPointer();
  }, []);

  const stopGame = useCallback(() => {
  setGameRunning(false);
  unlockPointer();
  document.body.style.cursor = 'default';

  targetsRef.current.forEach(t => sceneRef.current.remove(t));
  targetsRef.current = [];

  yawRef.current = 0;
  pitchRef.current = 0;
  mouseRef.current.set(0, 0);
  if (cameraRef.current) {
    cameraRef.current.rotation.set(0, 0, 0);
  }

  const timestamps = hitTimestampsRef.current;
  let avgTTK = null;
  if (timestamps.length > 1) {
    const intervals = [];
    for (let i = 1; i < timestamps.length; i++) {
      intervals.push((timestamps[i] - timestamps[i - 1]));
    }
    const total = intervals.reduce((acc, curr) => acc + curr, 0);
    avgTTK = Math.round(total / intervals.length);
  }

  const finalScore = scoreRef.current;
  const finalMissed = missedRef.current;
  const finalAccuracy = finalScore + finalMissed > 0
    ? parseFloat(((finalScore / (finalScore + finalMissed)) * 100).toFixed(1))
    : 100.0;

  // Send data to backend
fetch('http://localhost:8080/api/gridshot/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  credentials: 'include', // for session-based auth
  body: new URLSearchParams({
    score: finalScore,
    accuracy: finalAccuracy,
    ttk: avgTTK
  })
})
.then(res => {
  if (res.ok) {
    console.log("Gridshot result saved.");
  } else {
    res.text().then(text => console.error("Failed to save result:", text));
  }
})
.catch(err => console.error(err));


  setScore(0);
  setMissed(0);
  setTimeLeft(30);

  alert(`Game Stopped!\nYour score: ${finalScore}\nTime To Kill: ${avgTTK || 'N/A'}ms`);
}, []);


  useEffect(() => {
    if (!gameRunning) return;

    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const remaining = 30 - elapsed;

      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft(0);
        setGameRunning(false);
        unlockPointer();

        const timestamps = hitTimestampsRef.current;
        let avgTTK = 'N/A';
        if (timestamps.length > 1) {
          const intervals = [];
          for (let i = 1; i < timestamps.length; i++) {
            intervals.push((timestamps[i] - timestamps[i - 1]));
          }
          const total = intervals.reduce((acc, curr) => acc + curr, 0);
          avgTTK = Math.round(total / intervals.length);
        }

        const finalScore = scoreRef.current;
const finalMissed = missedRef.current;
const finalAccuracy = finalScore + finalMissed > 0
  ? parseFloat(((finalScore / (finalScore + finalMissed)) * 100).toFixed(1))
  : 100.0;

fetch('http://localhost:8080/api/gridshot/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  credentials: 'include',
  body: new URLSearchParams({
    score: finalScore,
    accuracy: finalAccuracy,
    ttk: avgTTK,
  }),
})
.then(res => {
  if (res.ok) {
    console.log("Gridshot result saved.");
  } else {
    res.text().then(text => console.error("Failed to save result:", text));
  }
})
.catch(err => console.error(err));

alert(`Time's up!\nYour score: ${finalScore}\nTime To Kill: ${avgTTK || 'N/A'}ms`);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [gameRunning]);

  useEffect(() => {
    const crosshair = crosshairRef.current;

    const handleMouseMove = (event) => {
      if (!gameRunning) return;

      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.set(mouseX, mouseY);

      if (crosshair) {
        if (!document.pointerLockElement) {
          crosshair.style.left = `${event.clientX - crosshairRadius}px`;
          crosshair.style.top = `${event.clientY - crosshairRadius}px`;
        } else {
          crosshair.style.left = `50%`;
          crosshair.style.top = `50%`;
          crosshair.style.transform = 'translate(-50%, -50%)';
        }
      }

      const sensitivity = 0.002;
      yawRef.current -= event.movementX * sensitivity;
      pitchRef.current -= event.movementY * sensitivity;
      pitchRef.current = Math.max(minPitch, Math.min(maxPitch, pitchRef.current));

      cameraRef.current.rotation.y = yawRef.current;
      cameraRef.current.rotation.x = pitchRef.current;
    };

    const handleClick = (event) => {
      if (!gameRunning) {
        startGame();
        return;
      }

      const pointer = document.pointerLockElement ? new THREE.Vector2(0, 0) : mouseRef.current;
      raycasterRef.current.setFromCamera(pointer, cameraRef.current);

      const intersects = raycasterRef.current.intersectObjects(targetsRef.current);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        removeTarget(hit);
        hitTimestampsRef.current.push(Date.now());
        setScore(prevScore => prevScore + 1);
        createTarget();
      } else {
        setMissed(prevMissed => prevMissed + 1);
      }
    };

    const handleKeyDown = (event) => {
      if (event.code === 'Digit6') {
        stopGame();
      }
    };

    if (gameRunning) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameRunning, startGame, stopGame, maxPitch, minPitch]);

  const accuracy = score + missed > 0 ? ((score / (score + missed)) * 100).toFixed(1) : '100.0';

  return (
    <div style={{ margin: 0, overflow: 'hidden', fontFamily: 'sans-serif', backgroundColor: '#000', color: 'white' }}>
      <div 
        id="navbar" 
        style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.5)',
          padding: '8px 20px',
          borderRadius: '8px',
          fontSize: '16px',
          zIndex: 10,
          minWidth: '300px',
          color: 'white'
        }}
      >
        <div style={{ marginRight: 'auto' }}>
          Score: <strong>{score}</strong>
        </div>
        <div style={{ fontSize: '22px', fontWeight: 'bold', textAlign: 'center', minWidth: '100px' }}>
          {timeLeft}s
        </div>
        <div style={{ marginLeft: 'auto' }}>
          Accuracy: <strong>{accuracy}%</strong>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        top: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        display: 'flex',
        gap: '10px'
      }}>
        <button 
          onClick={startGame}
          style={{ padding: '6px 12px', fontSize: '14px', cursor: 'pointer' }}
        >
          Start Game
        </button>
        {gameRunning && (
          <button 
            onClick={stopGame}
            style={{ padding: '6px 12px', fontSize: '14px', cursor: 'pointer' }}
          >
            Stop Game
          </button>
        )}
      </div>

      <div 
        id="crosshair" 
        ref={crosshairRef}
        style={{
          position: 'absolute',
          width: '15px',
          height: '15px',
          background: 'transparent',
          border: '1px solid red',
          borderRadius: '50%',
          zIndex: 100,
          pointerEvents: 'none',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />

      <canvas 
        id="gameCanvas" 
        ref={canvasRef}
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default Gridshot;
