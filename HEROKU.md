# Deploying on Heroku
## Google Credentials

1. Visit this link https://console.cloud.google.com/
2. Click the hamburger menu, click API's & Services, then click Credentials
3. Click Create credentials and then OAUTH Client ID
4. Put web application as your application type
5. Scroll down to Authorized redirect URIs and click add URI
6. Input https://happycows.herokuapp.com/users/auth_callback . Then click create.
7. You will see the Client ID and Client secret. Keep these on your screen. On another window navigate to the Heroku dashboard.
8. Go to the settings tab and click reveal config vars.
9. Define a config var called `GOOGLE_OAUTH_CLIENT_ID` and for the value use the client ID
10. Define a config var called `GOOGLE_OAUTH_CLIENT_SECRET` and for the value use the client secret
11. Define a config var called `GOOGLE_OAUTH_CALLBACK_URL` and for the value you can copy from step 6