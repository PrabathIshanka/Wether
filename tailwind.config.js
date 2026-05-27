/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "rain-fall": "rainFall 0.8s linear infinite",
        lightning: "lightning 4s ease-in-out infinite",
        "cloud-drift": "cloudDrift 12s linear infinite",
        "sun-pulse": "sunPulse 3s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        particle: "particle 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        "bounce-slow": "bounce 3s infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        rainFall: {
          "0%": { transform: "translateY(-100vh)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(100vh)", opacity: "0" },
        },
        lightning: {
          "0%, 90%, 100%": { opacity: "0" },
          "92%, 96%": { opacity: "1" },
          "94%, 98%": { opacity: "0" },
        },
        cloudDrift: {
          "0%": { transform: "translateX(-200px)" },
          "100%": { transform: "translateX(calc(100vw + 200px))" },
        },
        sunPulse: {
          "0%, 100%": {
            boxShadow: "0 0 30px 10px rgba(251, 191, 36, 0.3)",
            transform: "scale(1)",
          },
          "50%": {
            boxShadow: "0 0 80px 30px rgba(251, 191, 36, 0.6)",
            transform: "scale(1.05)",
          },
        },
        particle: {
          "0%": { transform: "translateY(0px) translateX(0px)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "1" },
          "100%": {
            transform: "translateY(-100px) translateX(50px)",
            opacity: "0",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
      },
      backgroundImage: {
        glass:
          "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
        "glass-dark":
          "linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))",
      },
      backdropBlur: {
        xs: "2px",
      },
      colors: {
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          border: "rgba(255, 255, 255, 0.15)",
          hover: "rgba(255, 255, 255, 0.12)",
        },
      },
    },
  },
  plugins: [],
};
