const { Client } = require('pg');

module.exports = {
  user: process.env.USER,
  password: null,
  host: '13.52.101.51',
  database: 'opentable',
};

// SHOW ALL;
// SELECT * FROM pg_settings WHERE pending_restart = true;

// SHOW config_file;
// /usr/local/var/postgres/postgresql.conf

// Tuning PG for performance
// # DB Version: 11
// # OS Type: mac
// # DB Type: web
// # Total Memory (RAM): 4 GB
// # Data Storage: ssd

// max_connections = 200
// shared_buffers = 1GB
// effective_cache_size = 3GB
// maintenance_work_mem = 256MB
// checkpoint_completion_target = 0.7
// wal_buffers = 16MB
// default_statistics_target = 100
// random_page_cost = 1.1
// work_mem = 2621kB
// min_wal_size = 1GB
// max_wal_size = 2GB