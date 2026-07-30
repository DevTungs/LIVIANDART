const bcrypt = require('bcryptjs')

const password = process.argv[2] || 'admin123'

bcrypt.hash(password, 10).then(hash => {
  console.log('\n--- Password Hash ---')
  console.log(`Password: ${password}`)
  console.log(`Hash: ${hash}`)
  console.log('\nAdd this to .env.local:')
  console.log(`ADMIN_PASSWORD_HASH=${hash}`)
  console.log('')
})
