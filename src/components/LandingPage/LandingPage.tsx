import './LandingPage.css'

export const LandingPage = () => {
    return (
        <>
            <header>
                <nav>
                    <li>Explore Costa Rica</li>
                    <li>Your Favorite Locations</li>
                </nav>
            </header>

            <section className='hero'>
                <div className='hero-content'>
                    <h1>Welcome to Leaf & Breeze</h1>
                    <h2> Travel and explore like never before</h2>
                </div>

                <section className="features">
                    <h2>Why us?</h2>

                    <div className='feature-container'>
                        <article className="landing-feature-article">
                            <h3>🧭 Explore the nature of Costa Rica</h3>
                            <p>From Peñas Blancas to Paso Canoas, a country full of biodiversity 🍃</p>
                        </article>

                        <article className="landing-feature-article">
                            <h3>📍 Interactive Maps</h3>
                            <p>Mark your next location ➡️</p>
                        </article>

                        <article className="landing-feature-article">
                            <h3>🚀 An immersive experience</h3>
                            <p>See what we prepared for you</p>
                        </article>
                    </div>

                </section>
            </section>

        </>
    )
}