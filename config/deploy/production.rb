server 'streaks', user: 'ubuntu', roles: %w{app web}
set :branch, 'master'
set :rails_env, 'production'

append :linked_files, ".env"