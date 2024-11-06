import { motion } from 'framer-motion'

function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-orange-100 py-16 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="container mx-auto text-center">

        {/* 3 Images with hover animations and stylish texts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {['https://swember.in/images/about/about1.jpg', 'https://swember.in/images/about/about2.jpg', 'https://swember.in/images/about/about3.jpg'].map((src, index) => (
            <motion.div
              key={src}
              className="relative group"
              whileHover={{ scale: 1.1, y: -10 }} // Animation on hover
              transition={{ duration: 0.3 }}
            >
              <img
                src={src}
                alt={`About Image ${index + 1}`}
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-lg shadow-xl transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              
              {/* Stylish text overlays */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ background: 'rgba(0, 0, 0, 0.4)', borderRadius: '8px' }}
              >
                {index === 0 && 'Find Your Partner'}
                {index === 1 && 'Build Happiness'}
                {index === 2 && 'Make Friends'}
              </motion.div>

              {/* Optional background overlay (darkens the image slightly on hover) */}
              <motion.div
                className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-all duration-300"
              ></motion.div>
            </motion.div>
          ))}
        </div>

        {/* Descriptive Text */}
        <div className="max-w-3xl mx-auto space-y-8 mt-16 text-gray-700 text-lg sm:text-xl">
          <p>
            Swember is more than just a dating app; it is a revolution in campus connections. 
            We have created a platform that understands the unique dynamics of college life, 
            bringing students together in meaningful ways that go beyond traditional dating.
          </p>
          
          <p>
            Our app is designed to foster genuine connections, whether you are looking for a 
            romantic partner, a study buddy, or just new friends to explore campus life with. 
            With Swember, you are not just swiping—you are building a community.
          </p>
          
          <p>
            We prioritize safety, inclusivity, and authenticity. Our advanced matching 
            algorithms consider your interests, courses, and campus activities to suggest 
            connections that truly resonate with you. Join Swember today and transform 
            your college experience!
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage;
