package config

import (
	"log"
	"os"

	"gopkg.in/yaml.v3"
)

var CONFIG_FILE_PATH = "./config.yml"

// Config ...
type Config struct {
	SQLDSN  string `yaml:"sql_dsn"`
	AuthUrl string `yaml:"auth_url"`
}

func DefaultACHConfig() *Config {
	return &Config{
		SQLDSN: "postgres://root:root@auth_pgsql:5432/bike",
		AuthUrl: "http://auth.localhost/api/v1/auth",
	}
}

func ReadConfig() (*Config, error) {
	configStr, err := os.ReadFile(CONFIG_FILE_PATH)
	if err != nil {
		return DefaultACHConfig(), err
	}

	config := &Config{}

	err = yaml.Unmarshal(configStr, config)
	if err != nil {
		log.Println(err)
	}

	return config, nil
}

func Save(config *Config) {
	configStr, _ := yaml.Marshal(config)
	os.WriteFile(CONFIG_FILE_PATH, configStr, 0666)
}
