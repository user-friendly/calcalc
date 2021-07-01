module.exports = {
  apps : [{
    name:           "calcalc",
    script:         "./app.js",
    watch:          true,
    // What does this exactly do?
    // watch_delay:    250,
    
    exp_backoff_restart_delay: 100,
    autorestart:    false,
    
    interpreter_args: "--inspect",
    
    pid_file:       "./pm2/app.pid",
    error_file:     "./pm2/app_error.log",
    out_file:       "./pm2/app_out.log",
    
    // FIXME Does not get applied when calling pm2 --env development
    env_development: {
        NODE_ENV:     "development",
        interpreter_args: "--inspect",
    },
    env_test: {
        NODE_ENV:     "test",
    },
    env_production: {
        NODE_ENV:     "production",
    }
  }]
}
