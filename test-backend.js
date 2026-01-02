// Test de conexión al backend
async function testBackend() {
  try {
    console.log('🔍 Probando /api/health...');
    const healthRes = await fetch('http://localhost:5000/api/health');
    const healthData = await healthRes.json();
    console.log('✅ Health:', healthData);

    console.log('\n🔍 Probando login...');
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@codigonativo.com',
        password: 'admin123'
      })
    });

    const loginData = await loginRes.json();
    console.log('✅ Login response:', loginData);

    if (loginData.success) {
      console.log('\n✅ ¡Autenticación exitosa!');
      console.log('Token:', loginData.token);
      console.log('Usuario:', loginData.user);
    } else {
      console.log('\n❌ Error de autenticación:', loginData.message);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testBackend();
