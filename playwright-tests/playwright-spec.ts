import { test, expect } from '@playwright/test';
import { spawn } from 'child_process';
import fetch from 'node-fetch';

// Helper function to start server
function startServer() {
  return new Promise<void>((resolve, reject) => {
    const server = spawn('npx', ['ts-node', 'src/server.ts'], { stdio: 'pipe', detached: false });

    let serverReady = false;
    let checkAttempts = 0;
    const maxAttempts = 30; // 30 seconds total

    const checkServer = async () => {
      if (serverReady) return;

      try {
        const response = await fetch('http://0.0.0.0:8000/api/contacts');
        if (response.ok) {
          serverReady = true;
          resolve(server);
          return;
        }
      } catch (error) {
        // Server not ready yet
      }

      checkAttempts++;
      if (checkAttempts >= maxAttempts) {
        reject(new Error('Server failed to start within 30 seconds'));
        return;
      }

      setTimeout(checkServer, 1000);
    };

    setTimeout(checkServer, 1000);
  });
}
