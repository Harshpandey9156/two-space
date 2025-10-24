import RotatingText from "@/components/RotatingText";
import TextType from "@/components/TextType";
import SplitText from "@/components/SplitText";
import PillNav from "@/components/PillNav";
import Particles from "@/components/Particles";
// import logo from './file.svg';

export default function HomePage() {
  const logo = '/file.svg';
  console.log(process.env.FIREBASE_STORAGE_BUCKET);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-indigo-950 via-gray-900 to-fuchsia-900 text-white flex flex-col">
      
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      <header className="relative z-10 flex flex-col sm:flex-row justify-between items-center px-4 sm:px-8 py-5 gap-4 sm:gap-0 w-full">

        <div className="flex-shrink-0">
          <img src={logo} alt="Company Logo" className="h-10 sm:h-12" />
        </div>

        <nav className="flex w-full sm:w-auto justify-end">
          <PillNav
            items={[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Services', href: '/services' },
              { label: 'Profile', href: '/profile' },
            ]}
            activeHref="/"
            className="custom-nav"
            ease="power2.easeOut"
            baseColor="transparent"
            pillColor="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500"
            hoveredPillTextColor="#ffffff"
            pillTextColor="#ffffff"
          />
        </nav>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center flex-grow text-center px-4 py-16 space-y-8">

        <SplitText
          text="Welcome to Two Space !"
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center"
          delay={100}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="center"
        />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-full text-center sm:text-left">
          <p className="text-2xl sm:text-3xl text-rose-100 font-semibold">
            A cozy digital space for couples to share
          </p>
          <TextType
            text={["their daily lives", "their schedule", "what they are doing", "and many more..."]}
            typingSpeed={55}
            pauseDuration={500}
            showCursor={true}
            cursorCharacter="|"
            className="text-2xl sm:text-3xl text-white font-medium"
          />
        </div>

        <div className="flex items-center justify-center bg-black/20 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-lg w-full max-w-md">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-white">
            <span className="text-rose-100">Create</span>
            <span className="bg-gradient-to-r from-pink-700 to-fuchsia-700 text-white px-4 sm:px-5 py-1 sm:py-2 rounded-2xl shadow-md inline-flex items-center justify-center overflow-hidden">
              <RotatingText
                texts={["memories 💕", "plans ✨", "stories 💫", "you & me 💞"]}
                mainClassName="inline-flex overflow-hidden leading-tight"
                staggerFrom="last"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                staggerDuration={0.05}
                splitLevelClassName="overflow-hidden"
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 300,
                  mass: 0.5,
                }}
                rotationInterval={2000}
              />
            </span>
          </h3>
        </div>
      </main>
    </div>
  );
}
