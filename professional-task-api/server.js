require('dotenv').config();

const app=require('./src/app.js');

const PORT=process.env.PORT || 3000;
const server=app.listen(PORT, ()=>{
     console.log(`🚀 Professional Task API running on port ${PORT}`);
    console.log(`📖 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API Base URL: http://localhost:${PORT}/api/v1`)
})


process.on('SIGTERM',()=>{
    console.log('🛑 SIGTERM received. Shutting down gracefully...');
    server.close(()=>{
        console.log('Process terminated');
        process.exit(0)
    })
});

process.on('SIGINT', () => {
    console.log('🛑 SIGINT received. Shutting down gracefully...');
    server.close(() => {
        console.log('✅ Process terminated');
        process.exit(0);
    });
});