import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, GridItem, Flex } from '../components/common/Layout';
import './Home.scss';

const Home: React.FC = () => {
  return (
    <Container>
      <div className="home">
        <header className="home__header">
          <h1 className="home__title">Readra Platform</h1>
          <p className="home__subtitle">Reimagining Digital Publishing</p>
        </header>
        
        <main className="home__main">
          <Grid columns={1} gap="lg">
            <GridItem>
              <div className="home__section">
                <h2 className="home__section-title">Components & Demos</h2>
                <p>Explore the building blocks of the Readra platform.</p>
                
                <Flex direction="column" gap="md" className="home__nav">
                  <Link to="/layout-demo" className="home__nav-link">
                    Layout Components Demo
                  </Link>
                  {/* Add more links to other demos as they are created */}
                </Flex>
              </div>
            </GridItem>
            
            <GridItem>
              <div className="home__section">
                <h2 className="home__section-title">Core Pillars</h2>
                
                <Grid 
                  columns={1} 
                  mdColumns={2} 
                  lgColumns={4} 
                  gap="md"
                  className="home__pillars"
                >
                  <div className="home__pillar">
                    <h3 className="home__pillar-title">UI/UX Excellence</h3>
                    <p>Setting a new standard that makes competing platforms feel outdated</p>
                  </div>
                  
                  <div className="home__pillar">
                    <h3 className="home__pillar-title">Creator-First Economics</h3>
                    <p>Ensuring writers benefit directly and proportionally from platform success</p>
                  </div>
                  
                  <div className="home__pillar">
                    <h3 className="home__pillar-title">Revolutionary Content Discovery</h3>
                    <p>Connecting readers with exactly the content they'll love</p>
                  </div>
                  
                  <div className="home__pillar">
                    <h3 className="home__pillar-title">Technological Innovation</h3>
                    <p>Leveraging AI, AR/VR and other technologies to enhance the reading experience</p>
                  </div>
                </Grid>
              </div>
            </GridItem>
          </Grid>
        </main>
        
        <footer className="home__footer">
          <p>&copy; 2025 Readra Platform</p>
        </footer>
      </div>
    </Container>
  );
};

export default Home;