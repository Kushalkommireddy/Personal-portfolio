import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  title: string;
  isFeatured?: boolean;
  summary: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
}

interface Education {
  level: string;
  institution: string;
  boardOrUniversity: string;
  year: string;
  score: string;
}

interface Internship {
  company: string;
  duration: string;
  role: string;
  highlights: { title: string; desc: string }[];
}

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  imageUrl: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- 1. LOADING SCREEN OVERLAY -->
    <div *ngIf="isLoading()" 
         [class.opacity-0]="isFadingOut()" 
         class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b0f19] transition-opacity duration-700 pointer-events-none">
      <div class="text-center px-6 transform animate-pulse">
        <div class="text-4xl sm:text-5xl mb-4">🚀</div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
          Welcome aboard!
        </h1>
        <p class="text-cyan-400 font-medium text-lg mt-2 tracking-wide">
          Let’s get to know Kushal
        </p>
      </div>
    </div>

    <!-- 2. FIXED NAVBAR -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-[#0b0f19]/80 backdrop-blur-md border-b border-slate-800/80 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 h-16 sm:h-20 flex items-center justify-between">
        <a href="#about" class="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-1">
          Kushal<span class="text-cyan-400">.</span>
        </a>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
          <a *ngFor="let sec of sections" 
             [href]="'#' + sec.id"
             (click)="setActiveSection(sec.id)"
             [ngClass]="activeSection() === sec.id ? 'text-cyan-400 bg-cyan-950/40 border-cyan-500/30' : 'text-slate-400 hover:text-white border-transparent'"
             class="px-3 py-1.5 rounded-lg border transition-all duration-200">
            {{ sec.name }}
          </a>
        </nav>

        <div class="flex items-center gap-3">
          <a href="#contact" class="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:scale-105">
            Get in Touch
          </a>
          <button (click)="toggleMobileMenu()" 
                  type="button"
                  aria-label="Toggle Navigation"
                  class="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path *ngIf="!isMobileMenuOpen()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              <path *ngIf="isMobileMenuOpen()" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Dropdown -->
      <div *ngIf="isMobileMenuOpen()" class="md:hidden bg-[#0e1424] border-b border-slate-800 px-6 py-4 space-y-2">
        <a *ngFor="let sec of sections"
           [href]="'#' + sec.id"
           (click)="onMobileNavClick(sec.id)"
           [ngClass]="activeSection() === sec.id ? 'text-cyan-400 font-bold' : 'text-slate-300'"
           class="block py-2 text-base tracking-wide transition-colors">
          {{ sec.name }}
        </a>
      </div>
    </header>

    <main class="pt-20">
      <!-- 3. ABOUT SECTION -->
      <section id="about" class="min-h-[calc(100vh-5rem)] flex items-center py-16 px-6 max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <!-- Neural Network Constellation Background + Profile Avatar -->
<div class="lg:col-span-5 flex justify-center items-center relative select-none">
  <!-- Outer Neural Canvas -->
  <div class="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[26rem] md:h-[26rem] flex items-center justify-center">
    
    <!-- 1. Ambient Synaptic Glow -->
    <div class="absolute inset-4 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/10 to-indigo-500/20 blur-2xl animate-pulse pointer-events-none"></div>

    <!-- 2. Rotating Synapse Vector Ring (Axons & Dendrites) -->
    <svg class="absolute inset-0 w-full h-full animate-spin-slow pointer-events-none" viewBox="0 0 400 400" fill="none">
      <!-- Synaptic Network Tracks -->
      <circle cx="200" cy="200" r="160" stroke="#06b6d4" stroke-width="1" stroke-opacity="0.25" stroke-dasharray="6 8" class="animate-synapse" />
      <circle cx="200" cy="200" r="185" stroke="#3b82f6" stroke-width="0.75" stroke-opacity="0.2" />

      <!-- Synaptic Axon Connections -->
      <line x1="200" y1="40" x2="330" y2="100" stroke="#22d3ee" stroke-width="1.2" stroke-opacity="0.35" stroke-dasharray="4 6" class="animate-synapse" />
      <line x1="330" y1="100" x2="360" y2="240" stroke="#06b6d4" stroke-width="1.2" stroke-opacity="0.3" />
      <line x1="360" y1="240" x2="260" y2="350" stroke="#3b82f6" stroke-width="1.2" stroke-opacity="0.35" stroke-dasharray="6 6" class="animate-synapse" />
      <line x1="260" y1="350" x2="110" y2="330" stroke="#06b6d4" stroke-width="1.2" stroke-opacity="0.3" />
      <line x1="110" y1="330" x2="40" y2="200" stroke="#38bdf8" stroke-width="1.2" stroke-opacity="0.35" stroke-dasharray="5 7" class="animate-synapse" />
      <line x1="40" y1="200" x2="90" y2="80" stroke="#06b6d4" stroke-width="1.2" stroke-opacity="0.3" />
      <line x1="90" y1="80" x2="200" y2="40" stroke="#60a5fa" stroke-width="1.2" stroke-opacity="0.35" stroke-dasharray="4 6" class="animate-synapse" />

      <!-- Firing Synapse Nodes (Floating Neurons) -->
      <circle cx="200" cy="40" r="4.5" fill="#22d3ee" class="filter drop-shadow-[0_0_6px_#06b6d4]" />
      <circle cx="330" cy="100" r="3.5" fill="#38bdf8" class="filter drop-shadow-[0_0_5px_#38bdf8]" />
      <circle cx="360" cy="240" r="5" fill="#06b6d4" class="filter drop-shadow-[0_0_8px_#06b6d4]" />
      <circle cx="260" cy="350" r="4" fill="#60a5fa" class="filter drop-shadow-[0_0_6px_#60a5fa]" />
      <circle cx="110" cy="330" r="4.5" fill="#22d3ee" class="filter drop-shadow-[0_0_6px_#06b6d4]" />
      <circle cx="40" cy="200" r="3.5" fill="#38bdf8" class="filter drop-shadow-[0_0_5px_#38bdf8]" />
      <circle cx="90" cy="80" r="4" fill="#06b6d4" class="filter drop-shadow-[0_0_6px_#06b6d4]" />
    </svg>

    <!-- 3. Inner Reverse Counter-Orbit Ring -->
    <svg class="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] animate-reverse-spin pointer-events-none" viewBox="0 0 300 300" fill="none">
      <circle cx="150" cy="150" r="130" stroke="#06b6d4" stroke-width="1" stroke-opacity="0.2" stroke-dasharray="12 16" />
      <!-- Concentrated Micro-Nodes -->
      <circle cx="150" cy="20" r="3" fill="#22d3ee" />
      <circle cx="265" cy="150" r="3.5" fill="#67e8f9" class="filter drop-shadow-[0_0_6px_#22d3ee]" />
      <circle cx="150" cy="280" r="3" fill="#06b6d4" />
      <circle cx="35" cy="150" r="3" fill="#38bdf8" />
    </svg>

    <!-- 4. Pulsing Corner Tech Accents -->
    <div class="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-cyan-400/80 rounded-tr-lg"></div>
    <div class="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-cyan-400/80 rounded-bl-lg"></div>

    <!-- 5. Profile Picture Container (Clipped within the Synaptic Core) -->
    <div class="relative z-10 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 rounded-3xl overflow-hidden p-1 bg-gradient-to-tr from-cyan-500/60 via-blue-500/20 to-cyan-400/80 shadow-[0_0_35px_rgba(6,182,212,0.25)] group">
      <div class="w-full h-full rounded-[1.4rem] overflow-hidden bg-slate-900 relative">
        <img src="/Kushal.jpg" 
             onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'"
             alt="Kushal Kommireddy" 
             loading="lazy" 
             class="w-full h-full object-cover transform group-hover:scale-105 transition duration-500" />
        <!-- Digital Vignette Layer -->
        <div class="absolute inset-0 bg-gradient-to-t from-[#0b0f19]/70 via-transparent to-transparent"></div>
      </div>
    </div>

  </div>
</div>

          <div class="lg:col-span-7 space-y-6">
            <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/60 text-cyan-400 border border-cyan-800/60">
              <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              CSE Data Science Graduate & Full-Stack Developer
            </span>
            <h1 class="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Hi, I'm <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Kushal Kommireddy</span>
            </h1>

            <p class="text-slate-400 text-base sm:text-lg leading-relaxed">
              Full-Stack Developer and Machine Learning enthusiast with hands-on experience designing robust web architectures, high-performance user interfaces, and applied AI systems.
            </p>

            <div class="pt-2">
              <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer"
                 class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium hover:border-cyan-500 transition-all duration-300 shadow-sm hover:scale-105">
                <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                View Resume
              </a>
            </div>

            <!-- Education Cards -->
            <div class="pt-6 border-t border-slate-800">
              <h3 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Academic Background</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div *ngFor="let edu of educationHistory" 
                     class="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition duration-300">
                  <div class="flex items-center justify-between mb-1">
                    <span class="text-sm font-bold text-white">{{ edu.level }}</span>
                    <span class="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400">{{ edu.year }}</span>
                  </div>
                  <p class="text-xs text-slate-300 font-medium">{{ edu.institution }}</p>
                  <p class="text-xs text-slate-500 mt-1">{{ edu.boardOrUniversity }}</p>
                  <p class="text-xs font-semibold text-emerald-400 mt-2">{{ edu.score }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. SKILLS SECTION WITH BIOMETRIC SPREAD ANIMATION -->
      <section id="skills" class="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/80 transition-all duration-700">
        <div class="text-center mb-12">
          <h2 class="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Technical Matrix</h2>
          <h3 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Skills & Tech Stack</h3>
        </div>

        <!-- Biometric Scanner Trigger (Hidden after unlock) -->
        <div *ngIf="!skillsUnlocked()" class="flex flex-col items-center justify-center py-16 px-4">
          <div (click)="triggerSkillsUnlock()"
               class="relative group cursor-pointer p-8 rounded-3xl bg-slate-900/80 border-2 border-dashed border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] transition-all duration-500 select-none flex flex-col items-center text-center max-w-md w-full">
            
            <!-- Laser Scan Line -->
            <div *ngIf="isScanning()" 
                 class="absolute inset-x-4 top-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] animate-bounce"></div>

            <!-- Fingerprint / Cursor Icon -->
            <div class="relative w-24 h-24 mb-6 flex items-center justify-center rounded-2xl bg-cyan-950/60 border border-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
              <svg class="w-14 h-14 text-cyan-400 group-hover:text-cyan-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004 11a7.96 7.96 0 001.076 4m8.058 6.945a16.035 16.035 0 01-3.134-2.945"/>
              </svg>
              <div class="absolute inset-0 rounded-2xl border border-cyan-400 animate-ping opacity-25"></div>
            </div>

            <span class="text-sm font-bold uppercase tracking-widest text-white mb-2 group-hover:text-cyan-400 transition-colors">
              {{ isScanning() ? 'Authenticating & Decrypting...' : 'Place Cursor / Thumb Impression' }}
            </span>
            <p class="text-xs text-slate-400 max-w-xs leading-relaxed">
              Click or tap the biometric pad to unlock and spread Kushal's complete skillset across the matrix.
            </p>
          </div>
        </div>

        <!-- Unlocked & Spread Skills Grid -->
        <div *ngIf="skillsUnlocked()" class="relative">
          <!-- Reset / Relock Button -->
          <div class="flex justify-end mb-6">
            <button (click)="skillsUnlocked.set(false)" 
                    type="button" 
                    class="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition">
              ↺ Relock Matrix
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div *ngFor="let group of skillGroups; let i = index" 
                 [style.animation-delay]="(i * 90) + 'ms'"
                 class="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 group animate-[fadeInUp_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]">
              <h4 class="text-lg font-bold text-white mb-4 pb-2 border-b border-slate-800 group-hover:text-cyan-400 transition-colors">
                {{ group.category }}
              </h4>
              <div class="flex flex-wrap gap-2">
                <span *ngFor="let item of group.skills" 
                      class="px-3 py-1 rounded-lg text-xs font-medium bg-slate-800/90 text-slate-300 border border-slate-700/60 group-hover:border-slate-600 hover:text-cyan-300 hover:scale-105 transition-all">
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 5. EXPERIENCE SECTION -->
      <section id="experience" class="py-24 px-6 max-w-5xl mx-auto border-t border-slate-800/80">
        <div class="text-center mb-16">
          <h2 class="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Career Trajectory</h2>
          <h3 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Internship Experience</h3>
        </div>

        <div>
          <div class="rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 p-6 sm:p-8 transition duration-300 hover:-translate-y-1 shadow-lg">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span class="inline-block px-3 py-1 rounded-lg text-sm font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                {{ internship.company }}
              </span>
              <span class="text-xs font-semibold px-3 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700/80">
                {{ internship.duration }}
              </span>
            </div>
            
            <h4 class="text-xl font-bold text-white mb-5">{{ internship.role }}</h4>

            <div class="bg-slate-950/60 rounded-xl p-5 border border-slate-800/80">
              <ul class="space-y-3.5">
                <li *ngFor="let point of internship.highlights" class="text-sm text-slate-300 flex items-start gap-3 leading-relaxed">
                  <span class="text-cyan-400 mt-1 font-bold">▹</span>
                  <span><strong class="text-white">{{ point.title }}:</strong> {{ point.desc }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 6. PROJECTS SECTION -->
      <section id="projects" class="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
        <div class="text-center mb-16">
          <h2 class="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Engineering Work</h2>
          <h3 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Featured Projects</h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div *ngFor="let p of projects" 
               [ngClass]="p.isFeatured ? 'md:col-span-2' : ''"
               class="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col justify-between group">
            
            <!-- Project Screenshot -->
            <div class="relative overflow-hidden h-56 sm:h-64 md:h-72 bg-slate-800">
              <img [src]="p.image" 
                   [alt]="p.title" 
                   loading="lazy" 
                   class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <div *ngIf="p.isFeatured" 
                   class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500 text-slate-950 uppercase tracking-wider shadow-md">
                Featured System
              </div>
            </div>

            <!-- Content Details -->
            <div class="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h4 class="text-2xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {{ p.title }}
                </h4>
                <p class="text-slate-400 text-sm leading-relaxed mb-6">
                  {{ p.summary }}
                </p>
                <!-- Tech Stack Tags -->
                <div class="flex flex-wrap gap-2 mb-6">
                  <span *ngFor="let t of p.tags" class="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-800 text-slate-300 border border-slate-700/60">
                    {{ t }}
                  </span>
                </div>
              </div>

              <!-- Links -->
              <div class="pt-4 border-t border-slate-800 flex items-center gap-4 text-sm font-semibold">
                <a [href]="p.githubUrl" target="_blank" rel="noopener noreferrer" 
                   class="inline-flex items-center gap-1.5 text-white hover:text-cyan-400 transition-colors">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  GitHub Repo
                </a>
                <a *ngIf="p.liveUrl" [href]="p.liveUrl" target="_blank" rel="noopener noreferrer" 
                   class="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                  Live Demo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 7. CERTIFICATES SECTION -->
      <section id="certificates" class="py-24 px-6 max-w-5xl mx-auto border-t border-slate-800/80 text-center">
        <h2 class="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Qualifications</h2>
        <h3 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">Credentials & Certifications</h3>
        <p class="text-slate-400 max-w-md mx-auto mb-10 text-sm">
          Click the credentials folder below to inspect certifications and validated coursework.
        </p>

        <!-- Interactive Animated Folder Graphic -->
        <div (click)="openCertModal()" 
             class="relative inline-block cursor-pointer p-10 group select-none">
          <div class="w-48 h-36 sm:w-56 sm:h-40 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-2xl shadow-[0_15px_35px_rgba(6,182,212,0.25)] flex flex-col justify-end p-5 relative border border-cyan-400/40 group-hover:scale-105 transition duration-300">
            <div class="absolute -top-4 left-6 right-6 h-8 bg-slate-200/90 rounded-t-lg shadow-inner transform -rotate-3 group-hover:-translate-y-3 transition duration-300"></div>
            <div class="absolute -top-7 left-10 right-10 h-10 bg-white rounded-t-lg shadow-md transform rotate-2 group-hover:-translate-y-4 transition duration-300"></div>
            
            <div class="relative z-10 flex items-center justify-between text-slate-950 font-black">
              <span class="tracking-wide text-sm uppercase">Certificates ({{ certificates.length }})</span>
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
          </div>
          <p class="text-xs text-cyan-400 mt-4 font-semibold tracking-wider uppercase group-hover:underline">Click to Open Vault</p>
        </div>

        <!-- Carousel Modal -->
        <div *ngIf="isModalOpen()" 
             class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b0f19]/90 backdrop-blur-md">
          <div class="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl p-6">
            <button (click)="closeCertModal()" 
                    type="button"
                    aria-label="Close Modal"
                    class="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/80">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>

            <div class="text-center pt-4">
              <span class="text-xs font-semibold px-2 py-1 rounded bg-cyan-950 text-cyan-400 uppercase tracking-widest">
                {{ activeCertIndex() + 1 }} of {{ certificates.length }}
              </span>
              <h4 class="text-xl font-bold text-white mt-2">{{ certificates[activeCertIndex()].title }}</h4>
              <p class="text-xs text-slate-400">{{ certificates[activeCertIndex()].issuer }} &bull; {{ certificates[activeCertIndex()].date }}</p>

              <div class="mt-6 h-64 sm:h-80 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                <img [src]="certificates[activeCertIndex()].imageUrl" 
                     [alt]="certificates[activeCertIndex()].title" 
                     class="max-h-full max-w-full object-contain p-2" />
              </div>
            </div>

            <div class="flex items-center justify-between mt-6">
              <button (click)="prevCert()" 
                      type="button"
                      class="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition">
                &larr; Prev
              </button>
              <div class="flex gap-1.5">
                <span *ngFor="let c of certificates; let i = index" 
                      (click)="activeCertIndex.set(i)"
                      [ngClass]="activeCertIndex() === i ? 'w-5 bg-cyan-400' : 'w-2 bg-slate-700'"
                      class="h-2 rounded-full cursor-pointer transition-all duration-300"></span>
              </div>
              <button (click)="nextCert()" 
                      type="button"
                      class="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition">
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. OTHERS / BEYOND THE CODE -->
      <section id="others" class="py-24 px-6 max-w-7xl mx-auto border-t border-slate-800/80">
        <div class="text-center mb-16">
          <h2 class="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Beyond The Code</h2>
          <h3 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Interests & Inspiration</h3>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <!-- Card 1: Travelling & Motorcycling -->
          <div class="lg:col-span-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg group">
            <div>
              <div class="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition duration-300">
                🏔️
              </div>
              <h4 class="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                Motorcycle Travel & Expeditions
              </h4>
              <p class="text-slate-400 text-sm leading-relaxed mb-4">
                Passionate about exploring and navigating high-altitude Himalayan routes like Himachal and Ladakh. Long road trips teach quick problem-solving, situational awareness, and disciplined preparation.
              </p>
            </div>
            <div class="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
              <span class="px-2.5 py-1 text-xs rounded bg-slate-800 text-slate-300">Beaches</span>
              <span class="px-2.5 py-1 text-xs rounded bg-slate-800 text-slate-300">Mountains</span>
              <span class="px-2.5 py-1 text-xs rounded bg-slate-800 text-slate-300">Exploring</span>
            </div>
          </div>

          <!-- Card 2: Videography & Visual Arts -->
          <div class="lg:col-span-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg group">
            <div>
              <div class="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition duration-300">
                🎬
              </div>
              <h4 class="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                Cinematic Videography & Editing
              </h4>
              <p class="text-slate-400 text-sm leading-relaxed mb-4">
                Creating cinematic content, motion typography, and dynamic framing. Video editing sharpens pacing, user psychology, and aesthetic attention to detail that directly enhances frontend design.
              </p>
            </div>
            <div class="flex flex-wrap gap-2 pt-4 border-t border-slate-800">
              <span class="px-2.5 py-1 text-xs rounded bg-slate-800 text-slate-300">16:9 Video</span>
              <span class="px-2.5 py-1 text-xs rounded bg-slate-800 text-slate-300">Capturing Moments</span>
              <span class="px-2.5 py-1 text-xs rounded bg-slate-800 text-slate-300">Nature</span>
            </div>
          </div>

          <!-- Card 3: Inspiration - Virat Kohli -->
          <div class="lg:col-span-4 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0e1424] border border-slate-800 hover:border-amber-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-lg group">
            <div>
              <div class="flex items-center gap-4 mb-4">
                <div class="relative w-16 h-16 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-[0_0_15px_rgba(251,191,36,0.3)] bg-slate-800">
                  <img src="/Virat.jpg" 
                       onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80'"
                       alt="Virat Kohli" 
                       loading="lazy"
                       class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                </div>
                <div>
                  <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/60">
                    Role Model
                  </span>
                  <h4 class="text-lg font-bold text-white mt-1">Virat Kohli</h4>
                  <p class="text-xs text-slate-400">Master of Relentless Discipline</p>
                </div>
              </div>
              <p class="text-slate-300 text-sm leading-relaxed mb-4">
                I deeply admire Virat Kohli for his <strong class="text-white">uncompromising work ethic</strong>, clutch mentality under high pressure, and intense physical and mental conditioning. His standard of personal accountability is a benchmark for how I tackle complex engineering tasks.
              </p>
            </div>
            <div class="pt-4 border-t border-slate-800/80 text-xs font-semibold text-amber-400">
              <span>"There is a one percent chance, and sometimes that chance is good enough."</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 9. CONTACT SECTION -->
      <section id="contact" class="py-24 px-6 max-w-4xl mx-auto border-t border-slate-800/80 text-center">
        <h2 class="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">Connect</h2>
        <h3 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">Let's Connect</h3>
        <p class="text-slate-400 max-w-md mx-auto mb-10 text-sm sm:text-base leading-relaxed">
          Open to full-time engineering roles, software internships, and collaborative development. Reach out directly through any channel below.
        </p>

        <div class="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
          <a href="https://www.linkedin.com/in/kushal-kommireddy-112931kk/" target="_blank" rel="noopener noreferrer"
             class="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-white font-medium text-sm flex items-center gap-2.5 transition duration-300 hover:scale-105 shadow-md">
            <span class="text-cyan-400 font-bold">in</span> LinkedIn
          </a>

          <a href="https://github.com/kushalkommireddy" target="_blank" rel="noopener noreferrer"
             class="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-white font-medium text-sm flex items-center gap-2.5 transition duration-300 hover:scale-105 shadow-md">
            <svg class="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            GitHub
          </a>

          <a href="https://www.instagram.com/kushal.chaitanya/" target="_blank" rel="noopener noreferrer"
             class="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-white font-medium text-sm flex items-center gap-2.5 transition duration-300 hover:scale-105 shadow-md">
            <span class="text-cyan-400 font-bold">ig</span> Instagram
          </a>

          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=kushalkommireddy@gmail.com&su=Portfolio%20Inquiry%20-%20Kushal%20Kommireddy" 
   target="_blank" 
   rel="noopener noreferrer"
   class="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2.5 transition duration-300 hover:scale-105 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
  Email
</a>

          <a href="tel:+919032613369"
             class="px-5 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500 text-white font-medium text-sm flex items-center gap-2.5 transition duration-300 hover:scale-105 shadow-md">
            <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            Phone Call
          </a>
        </div>
      </section>
    </main>

    <!-- 10. BACK TO TOP BUTTON -->
    <button *ngIf="showBackToTop()" 
            (click)="scrollToTop()" 
            type="button"
            aria-label="Scroll back to top"
            class="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-cyan-400 hover:scale-110 active:scale-95 transition-all duration-300">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>
    </button>

    <!-- FOOTER -->
    <footer class="py-8 border-t border-slate-800 text-center text-xs text-slate-500">
      <p>&copy; 2026 Kushal Kommireddy. Crafted with Angular & Tailwind CSS.</p>
    </footer>
  `
})
export class App implements OnInit {
  isLoading = signal(false);
  isFadingOut = signal(false);

  // Biometric Skill Unlock States
  skillsUnlocked = signal(false);
  isScanning = signal(false);

  isMobileMenuOpen = signal(false);
  showBackToTop = signal(false);
  activeSection = signal('about');

  isModalOpen = signal(false);
  activeCertIndex = signal(0);

  sections = [
    { id: 'about', name: 'About' },
    { id: 'skills', name: 'Skills' },
    { id: 'experience', name: 'Experience' },
    { id: 'projects', name: 'Projects' },
    { id: 'certificates', name: 'Certificates' },
    { id: 'others', name: 'Others' },
    { id: 'contact', name: 'Contact' }
  ];

  educationHistory: Education[] = [
    {
      level: 'B.Tech in Computer Science Engineering - Data Science',
      institution: 'Aditya College of Engineering and Technology',
      boardOrUniversity: 'JNTUK',
      year: '2022 - 2026',
      score: 'GPA: 7.6'
    },
    {
      level: 'Class 12 (MPC)',
      institution: 'Aditya Junior College',
      boardOrUniversity: 'Board of Intermediate Education, AP',
      year: '2020 - 2022',
      score: 'Percentage: 88%'
    }
  ];

  skillGroups = [
    {
      category: 'Programming Languages',
      skills: ['Python', 'C', 'C++', 'Java']
    },
    {
      category: 'Full Stack',
      skills: ['HTML5', 'CSS', 'JavaScript', 'React.js', 'Tailwind', 'Next.js', 'Angular.js', 'React Native']
    },
    {
      category: 'Backend',
      skills: ['Node.js', 'Express.js', 'Flask']
    },
    {
      category: 'Machine Learning Tools',
      skills: ['Python for Machine Learning', 'Data Analysis', 'CNN', 'NLP']
    },
    {
      category: 'Libraries',
      skills: ['Pandas', 'NumPy', 'OpenCV']
    },
    {
      category: 'Developer Tools',
      skills: ['Jupyter', 'VSCode', 'Figma']
    },
    {
      category: 'Databases',
      skills: ['MySQL', 'MongoDB', 'Supabase', 'Neon', 'PostgreSQL']
    },
    {
      category: 'DevOps & MLOps',
      skills: ['Git', 'GitHub', 'Docker', 'FastAPI', 'CI/CD']
    }
  ];

  internship: Internship = {
    company: 'Technical Hub',
    duration: 'June 2024 - June 2025',
    role: 'Full Stack & React Native Developer',
    highlights: [
      {
        title: 'Advanced HTML5',
        desc: 'Delivered 50+ semantic, SEO-optimized, and accessible HTML5 documents with 100% cross-browser compatibility.'
      },
      {
        title: 'Responsive CSS',
        desc: 'Built 30+ responsive layouts using Flexbox, Grid, and media queries, boosting cross-device compatibility by 30% and user engagement by 25%. Enhanced UX with animations/transitions, improving interaction speed by 40%.'
      },
      {
        title: 'JavaScript Mastery',
        desc: 'Pioneered 20+ dynamic web components using ES6+, async/await, and DOM manipulation, cutting load times by 35% and boosting performance by 50%.'
      },
      {
        title: 'React Development',
        desc: 'Created 15+ state-driven UIs with React, increasing user interactivity by 25%.'
      },
      {
        title: 'Performance Optimization',
        desc: 'Reduced page load times by 40% and improved performance by 50% through lazy loading, file minification, and web performance best practices.'
      },
      {
        title: 'React Native (Expo)',
        desc: 'Architected a cross-platform mobile application "Job Path" using React Native and Expo Go, implementing 25+ reusable components and achieving 95% smooth performance across Android devices.'
      },
      {
        title: 'Team Collaboration',
        desc: 'Led and collaborated with teams, mentoring interns and integrating AI/ML features that enhanced product workflows and reduced development time by 20%.'
      }
    ]
  };

  projects: Project[] = [
    {
      title: 'SmartBin AI - Waste Classification System',
      isFeatured: true,
      summary: 'A software solution to automatically identify and categorize waste through image and text inputs, improving waste management efficiency using CNN and NLP.',
      image: '/SmartBin.png',
      tags: ['Python', 'Flask', 'HTML', 'CSS', 'JavaScript', 'TensorFlow/Keras', 'NLP', 'CNN'],
      githubUrl: 'https://github.com/Kushalkommireddy/smart-bin-ai-final',
      liveUrl: 'https://github.com/Kushalkommireddy/smart-bin-ai-final'
    },
    {
      title: 'JobPath - React Native Application',
      summary: 'A career-guidance mobile app that intelligently matches user-uploaded certified skills with real-time job opportunities and provides personalized job role insights.',
      image: '/Jobpath.png',
      tags: ['React-Native', 'Node.js', 'Express.js', 'MongoDB', 'Expo Go'],
      githubUrl: 'https://github.com/kushalkommireddy'
    },
    {
      title: 'TripWise - Indian Budget Trip Maker',
      summary: 'A smart travel planning platform that creates personalized, budget-friendly itineraries based on destination, duration, interests, and budget. Provides realistic cost estimates, transportation, accommodation, activities, and day-by-day plans to help Indian travelers plan trips confidently.',
      image: '/Tripwise.png',
      tags: ['Next.js', 'TypeScript', 'Neon', 'Gmail SMTP', 'Git', 'Vercel'],
      githubUrl: 'https://github.com/kushalkommireddy',
      liveUrl: 'https://github.com/kushalkommireddy'
    },
    {
      title: 'Do it - Expense Tracker + To Do List',
      summary: 'A multi-user productivity web app combining a to-do list (with calendar, categories, and priorities) and an expense tracker (with category-based spending charts) behind secure, individual accounts.',
      image: '/Do-it.png',
      tags: ['Next.js', 'Supabase', 'CSS', 'Recharts', 'Gmail SMTP', 'Git', 'Vercel'],
      githubUrl: 'https://github.com/Kushalkommireddy/do-it-app',
      liveUrl: 'https://do-it-app-kohl.vercel.app/'
    },
    {
      title: 'Infrastructure Tracker',
      summary: 'A web platform to track electrical and non-electrical assets across multiple buildings, making asset management organized. Helps in monitoring infrastructure, ensuring proper maintenance, and improving long-term facility planning.',
      image: '/Infra.png',
      tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
      githubUrl: 'https://github.com/Kushalkommireddy/Infrastructure_Tracker'
    }
  ];

  certificates: Certificate[] = [
    { title: 'Oracle Certified Foundations Associate', issuer: 'Oracle', date: '2025', imageUrl: '/oracle.png' },
    { title: 'IT Specialist - HTML & CSS', issuer: 'Pearson VUE', date: '2023', imageUrl: '/html.png' },
    { title: 'IT Specialist - Python', issuer: 'Pearson VUE', date: '2024', imageUrl: '/python.png' },
    { title: 'Introduction to Cisco Networks', issuer: 'Cisco', date: '2024', imageUrl: '/Cisco.png' },
    { title: 'Career Edge Young Professional', issuer: 'TCS - ION', date: '2025', imageUrl: '/Tcs-ion.png' },
    { title: 'Deep Learning for NLP', issuer: 'NPTEL', date: '2025', imageUrl: '/dl.png' },
    { title: 'Introduction to Data Science', issuer: 'Cisco Networking Academy', date: '2023', imageUrl: '/Data-science.png' },
    { title: 'PCAP - Programming Essentials in Python', issuer: 'OpenEDG', date: '2023', imageUrl: '/python-ess.png' }
  ];

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.isLoading.set(true);
      setTimeout(() => {
        this.isFadingOut.set(true);
        setTimeout(() => this.isLoading.set(false), 500);
      }, 1200);
    }
  }

  // Trigger Scanner and Staggered Burst
  triggerSkillsUnlock() {
    if (this.isScanning() || this.skillsUnlocked()) return;
    this.isScanning.set(true);

    setTimeout(() => {
      this.isScanning.set(false);
      this.skillsUnlocked.set(true);
    }, 700);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (typeof window === 'undefined') return;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || 0;
    this.showBackToTop.set(scrollPosition > 350);

    for (const section of this.sections) {
      const el = document.getElementById(section.id);
      if (el) {
        const top = el.offsetTop - 120;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeSection.set(section.id);
          break;
        }
      }
    }
  }

  setActiveSection(id: string) {
    this.activeSection.set(id);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
  }

  onMobileNavClick(id: string) {
    this.setActiveSection(id);
    this.isMobileMenuOpen.set(false);
  }

  scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openCertModal() {
    this.activeCertIndex.set(0);
    this.isModalOpen.set(true);
  }

  closeCertModal() {
    this.isModalOpen.set(false);
  }

  nextCert() {
    this.activeCertIndex.update(idx => (idx + 1) % this.certificates.length);
  }

  prevCert() {
    this.activeCertIndex.update(idx => (idx - 1 + this.certificates.length) % this.certificates.length);
  }
}