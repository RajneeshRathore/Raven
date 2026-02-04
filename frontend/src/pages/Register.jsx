import React from 'react'
import Logo from '../components/normal/Logo'
import Particles from '../components/animated/ParticleSpread'
import { Link } from 'react-router-dom'
const Register = () => {
   return (
    <div className="h-screen bg-black">
      <div
        className="fixed top-0 left-0 w-full z-50 
                          flex items-center justify-between
                           py-2
                          "
      >
        <Logo />
      </div>
      <Particles
        particleColors={["#ffffff"]}
        particleCount={400}
        particleSpread={20}
        speed={0.1}
        particleBaseSize={150}
        moveParticlesOnHover
        alphaParticles={false}
        disableRotation={false}
        pixelRatio={1}
      />
      <div className="h-full w-[100vw]  fixed top-0 left-0 flex items-center justify-center text-white py-10">
  <div
    className="h-full w-[50%] min-w-[320px] max-w-md rounded-2xl 
               bg-white/5 backdrop-blur-md border border-white/10 
               flex flex-col justify-center px-8"
  >
    <h1 className="text-3xl font-bold text-center">
      Create an account
    </h1>
    <p className="mt-2 text-center text-white/60">
      Join Raven and start chatting securely
    </p>

    <input
      type="email"
      placeholder="Email"
      className="mt-6 w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3
                 text-white placeholder-white/40 focus:outline-none focus:ring-2
                 focus:ring-white/20"
    />

    <input
      type="text"
      placeholder="Username"
      className="mt-4 w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3
                 text-white placeholder-white/40 focus:outline-none focus:ring-2
                 focus:ring-white/20"
    />

    <input
      type="password"
      placeholder="Password"
      className="mt-4 w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3
                 text-white placeholder-white/40 focus:outline-none focus:ring-2
                 focus:ring-white/20"
    />

    <input
      type="date"
      className="mt-4 w-full rounded-lg bg-black/40 border border-white/10 px-4 py-3
                 text-white placeholder-white/40 focus:outline-none focus:ring-2
                 focus:ring-white/20"
    />

    <button
      className="mt-6 w-full rounded-lg bg-white py-3 font-semibold text-black
                 hover:bg-white/90 active:scale-95 transition"
    >
      Create Account
    </button>

    <p className="mt-5 text-center text-sm text-white/60">
      Already have an account?{" "}
      <Link to="/login" >
      <span className="text-white hover:underline cursor-pointer">
        Log in
      </span>
      </Link>
    </p>
  </div>
</div>

    </div>
  );
}

export default Register
