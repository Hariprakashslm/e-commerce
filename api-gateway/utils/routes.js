
 
const ROUTES = [
    {
        url: '/users',
        auth: false, 
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3001",
            changeOrigin: true,         
        }
    }, 
    {
        url: '/products',
        auth: false, 
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3002",
            changeOrigin: true,         
        }
    }, 
    {
        url: '/cart',
        auth: false, 
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3003",
            changeOrigin: true,         
        }
    }, 
    {
        url: '/orders',
        auth: false, 
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3004",
            changeOrigin: true,         
        }
    }, 
    {
        url: '/payments',
        auth: false, 
        rateLimit: {
            windowMs: 15 * 60 * 1000,
            max: 5
        },
        proxy: {
            target: "http://localhost:3005",
            changeOrigin: true,         
        }
    }, 
]

exports.ROUTES = ROUTES;