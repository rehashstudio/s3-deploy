import { getInput, setFailed } from '@actions/core';
import deploy from './deploy';

async function run() {
  try {
    const folder = getInput('folder');
    const bucket = getInput('bucket');
    const distIds = getInput('dist-ids');
    const invalidation = getInput('invalidation');

    await deploy(folder, bucket, distIds, invalidation);
  }
  catch (error) {
    setFailed(error.message);
  }
}

run()
