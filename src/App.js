import React from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import { Layout, Typography, Space } from 'antd'
import { CryptoDetails, Cryptocurrencies, Exchanges, Homepage, Navbar, News } from './components'

const App = () => {
  return (
    <div className='app'>
      <header className='header'>
        <Navbar />
      </header>
      <main className='main'>
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route exact path="/exchanges" element={<Exchanges />} />
              <Route exact path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route exact path="//crypto/:coinId" element={<CryptoDetails />} />
              <Route exact path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <footer className='footer'>
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>
            Cryptoverse <br /> All rights reserved
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </footer>
      </main>
    </div>
  )
}

export default App
