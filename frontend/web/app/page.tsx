// Copyright 2026 Bills.ai
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import Link from 'next/link'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-yellow-300 opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-blue-400 opacity-30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-300 opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8 text-center">
        {/* Logo/Product Name */}
        <header>
          <h1 className="text-8xl font-extrabold tracking-tight text-white drop-shadow-2xl sm:text-9xl md:text-[10rem]">
            Bills.ai
          </h1>
        </header>

        {/* Horizontal Divider */}
        <div className="w-64 border-t-4 border-white/50 sm:w-96"></div>

        {/* Primary Actions - Stack vertically on mobile, horizontal on desktop */}
        <nav 
          className="flex flex-col gap-4 sm:flex-row sm:gap-6" 
          role="navigation" 
          aria-label="Main navigation"
        >
          {/* Register - Secondary (Outline) */}
          <Link
            href="/register"
            className="rounded-lg border-3 border-white bg-transparent px-8 py-3.5 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-purple-600 focus:outline-none focus:ring-4 focus:ring-white/50 sm:px-10"
          >
            Register
          </Link>

          {/* Login - Secondary (Outline) */}
          <Link
            href="/login"
            className="rounded-lg border-3 border-white bg-transparent px-8 py-3.5 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-purple-600 focus:outline-none focus:ring-4 focus:ring-white/50 sm:px-10"
          >
            Login
          </Link>

          {/* Quick Start - Primary CTA (Filled) */}
          <Link
            href="/quickstart"
            className="rounded-lg bg-white px-8 py-3.5 text-lg font-bold text-purple-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/50 focus:outline-none focus:ring-4 focus:ring-white/70 sm:px-10"
          >
            Quick Start
          </Link>
        </nav>
      </div>
    </main>
  )
}