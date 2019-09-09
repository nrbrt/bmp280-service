const BME280 = require('bme280-sensor');
const mqtt = require('mqtt');
const client = mqtt.connect('tcp://localhost');


const options1 = {
  i2cBusNo   : 1, // defaults to 1
  i2cAddress : 0x77 // defaults to 0x77
};

const options2 = {
  i2cBusNo   : 1, // defaults to 1
  i2cAddress : 0x76 // defaults to 0x77
};


const bme280_1 = new BME280(options1);
const bme280_2 = new BME280(options2);


const readSensorData_1 = () => {
  bme280_1.readSensorData()
    .then((data) => {
      //console.log(`data = ${JSON.stringify(data, null, 2)}`);
      client.publish('bme280', JSON.stringify(data, null, 2));
      setTimeout(readSensorData_1, 2000);
    })
    .catch((err) => {
      console.log(`BME280_1 read error: ${err}`);
      setTimeout(readSensorData_1, 2000);
    });
};


const readSensorData_2 = () => {
  bme280_2.readSensorData()
    .then((data) => {
      //console.log(`data = ${JSON.stringify(data, null, 2)}`);
      client.publish('bme280', JSON.stringify(data, null, 2));
      setTimeout(readSensorData_2, 2000);
    })
    .catch((err) => {
      console.log(`BME280_2 read error: ${err}`);
      setTimeout(readSensorData_2, 2000);
    });
};


// Initialize the BME280 sensor
//
bme280_1.init()
  .then(() => {
    console.log('BME280 initialization succeeded at 0x77');
    readSensorData_1();
  })
  .catch((err) => console.error(`BME280_1 initialization failed at 0x77: ${err} `));

bme280_2.init()
  .then(() => {
    console.log('BME280 initialization succeeded at 0x76');
    readSensorData_2();
  })
  .catch((err) => console.error(`BME280_2 initialization failed at 0x76: ${err} `));
