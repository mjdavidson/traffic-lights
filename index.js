const fetch = require('node-fetch');
const username = 'EzMrd7Q02xsoEOGESDxGduK9VDRn9N0bNJ6oBtdq';
const url = `http://192.168.178.84/api/${username}`;

const traffic = async () => {
  const colors = {
    red: {
      hue: 0,
      time: 3000
    },
    orange: {
      hue: 6375,
      time: 10000
    },
    green: {
      hue: 25600,
      time: 0
    }
  };

  const res = await fetch(url);
  const data = await res.json();
  const numberOfLights = 3;
  setInterval(async () => {
    await change(colors.green.hue, colors.green.time, numberOfLights);
    await change(colors.orange.hue, colors.orange.time, numberOfLights);
    await change(colors.red.hue, colors.red.time, numberOfLights);
  }, 20000);
};

const change = (hue, time, numberOfLights) => {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ on: true, bri: 255, sat: 255, hue });
    setTimeout(() => {
      console.log('changing to', hue);
      for (let lamp = 1; lamp < numberOfLights + 1; lamp++) {
        fetch(`${url}/lights/${lamp}/state`, { method: 'put', body })
          .then(() => resolve())
          .catch(() => reject());
      }
    }, time);
  });
};

traffic();
