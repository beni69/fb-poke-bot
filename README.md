# fb-poke-bot

instantly poke your friends back on facebook with this script

## how to use

-   you need nodejs and yarn installed
-   git clone the repo `git clone https://github.com/beni69/fb-poke-bot.git`
-   put your facebook credentials in a **.env** file _(take a look at
    **.env.example**)_
-   install packages with `yarn install`
-   build it with `yarn build`
-   run with `yarn start`

## running on a raspberry pi

unfortunately running puppeteer on a pi takes some more setup. this little
tutorialis based on [this](https://krsz.me/yhlSC) article. if you are gettting
chromium errors when trying to run this program, you need to follow these steps:

-   manually install chromium on your pi
    `sudo apt install chromium-browser chromium-codecs-ffmpeg`
-   tell puppeteer to use this install by putting this line in your .env file:
    `PUPPETEER_EXECUTABLE_PATH="/usr/bin/chromium-browser"`
