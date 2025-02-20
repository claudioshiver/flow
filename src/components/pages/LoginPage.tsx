'use client';

import {signIn} from "next-auth/react";

export default function LoginPage() {
  return (
    <div>
      <h1 className="mb-8">Login</h1>
      <div className="flex flex-col gap-4">
        <button onClick={() => signIn("google")} className="bg-red-500 text-white px-4 py-2 rounded">
          Login con Google
        </button>
        <button onClick={() => signIn("instagram")} className="bg-pink-500 text-white px-4 py-2 rounded">
          Login con Instagram
        </button>
        <button onClick={() => signIn("facebook")} className="bg-blue-500 text-white px-4 py-2 rounded">
          Login con Facebook
        </button>
      </div>
    </div>
  );
}