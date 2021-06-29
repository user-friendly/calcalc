module.exports = {
  apps : [{
    name:           "Calorie Calculator",
    script:         "./app.js",
    watch:          true,
    
    interpreter_args: "--inspect",
    
    pid_file:       "./pm2/app.pid",
    error_log:      "./pm2/app_error.log",
    out_file:       "./pm2/app_out.log",
    
    env: {
      NODE_ENV:     "development",
    },
    env_production: {
      NODE_ENV:     "production",
    }
  }]
}
