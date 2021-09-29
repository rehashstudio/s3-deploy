const path = require("path");
const exec = require("@actions/exec");

let deploy = function (folder, bucket, distIds, invalidation) {
  return new Promise((resolve, reject) => {
    try {
      const command = `npx s3-deploy@1.4.0 ./** \
                          --bucket ${bucket} \
                          --cwd . \
                          --gzip xml,html,htm,js,css,ttf,otf,svg,txt`;

        const cwd = path.resolve(folder);
        exec.exec(command, [], { cwd }).then(resolve).catch(reject);
      distIds.forEach(distId => {
        const command = `npx s3-deploy@1.4.0 \
                          --cwd . \
                          --distId ${distId} \
                          --etag \
                          --gzip xml,html,htm,js,css,ttf,otf,svg,txt \
                          --invalidate "${invalidation}" \
                          --noCache `;

        const cwd = path.resolve(folder);
        exec.exec(command, [], { cwd }).then(resolve).catch(reject);
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = deploy;
