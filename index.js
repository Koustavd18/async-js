const fs = require("fs");
const superagent = require("superagent");

// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(`Breed : ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err, res) => {
//       if (err) {
//         return console.log(err);
//       }
//       console.log(res.body.message);

//       fs.writeFile(`${__dirname}/dog-image.txt`, res.body.message, (err) => {
//         if (err) {
//           return console.log(err.message);
//         }
//         console.log(`Image url saved. Dog breed is: ${data}`);
//       });
//     });
// });

//with promises

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) return reject("Cannot find the file");
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("Failed to write");
      resolve("Success");
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed Name : ${data}`);

    const res0 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res1 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2 = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res0, res1, res2]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePro(`${__dirname}/dog-image.txt`, imgs.join("\n"));
    console.log("Image Url Saved");
  } catch (err) {
    console.log(err.message);
    throw err;
  }
  return "Ready";
};

(async () => {
  try {
    console.log("1.Getting ready");
    const x = await getDogPic();
    console.log(x);
    console.log("Done");
  } catch (err) {
    console.log("error 💥");
  }
})();

/*
readFilePro(`${__dirname}/doog.txt`).then((data) => {
  console.log(`Breed name : ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);
      return writeFilePro(`${__dirname}/dog-image.txt`, res.body.message);
    })
    .then(() => {
      console.log("Image Url Saved");
    })
    .catch((err) => {
      console.log(err.message);
    });
});
*/

// fs.readFile(`${__dirname}/dog.txt`, "utf-8", (err, data) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log(`Breed name : ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile(`${__dirname}/dog-image.txt`, "utf-8", (err) => {
//         if (err) {
//           return console.log(err);
//         }
//         console.log("Img url saved");
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });
