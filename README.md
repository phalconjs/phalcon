![](phalcon.jpg)

A fast web framework for Nodejs

# Basic Usage
```javascript
var phalcon = require("phalcon");
var app = new phalcon();

app.get("/", (req, res) => {
    res.send("Hello World from PhalconJS");
});
app.listen(3000);
```
# Installation
```sh
npm install phalcon --save
```
# Examples
To run the examples.
1. Clone the repo:

        git clone git://github.com/phalconjs/phalcon.git

1. Move into the `phalcon` directory from the terminal:

        cd phalcon

1. Install the dependencies:

        npm install

1. To run any example you want:

        node examples/<example-dir>

# Test
To run the test.
1. Clone the repo:

        git clone git://github.com/phalconjs/phalcon.git

1. Move into the `phalcon` directory from the terminal:

        cd phalcon

1. Install the dependencies:

        npm install

1. Run:
        npm test

# Auth Schemes and Strategies to be added

* **HTTP Basic Authentication (default)**: The client will use the HTTP Authorization header to send an encoded version of the API Key using the HTTP Basic Authentication standard. The username part is the value of the API Key and the password part should be blank (empty string). Use the value basic for the key APIKeyAuthType to use this strategy.

* **HTTP Header Authentication**: The client will set the HTTP APIKey header to the value of the API Key. In this scenario, the server MUST only support HTTPS only endpoints so that the key is not passed in plain text. Use the value apikey for the key APIKeyAuthType to use this strategy.

* **LDAP Authentication**: The client will use the HTTP Authorization header to send an encoded version of the API Key using the HTTP Basic Authentication standard. The username and password will be sent to the configured LDAP server for authentication. Use the value ldap for the key APIKeyAuthType to use this strategy. See the example below for using LDAP configuration.

* **No Authentication**: The client does not need any authentication to access these APIs. In this case, all client requests will be accepted without any security. Use the value none for the key APIKeyAuthType to use this strategy.

* **Custom Plugin**: Using the plugin strategy, you can extend the authentication to use any third-party or custom API authentication. To build your own plugin, set the value plugin for the key APIKeyAuthType to use this strategy and then set the key APIKeyAuthPlugin to the location of your plugin. The location can either be a file path (relative to the current work directory of your server project directory) or the name of the module package available in the standard node_modules location.