const core = require('@actions/core');
const exec = require('@actions/exec');

function run() {

    const bucket = core.getInput('bucketName', { required: true });
    const bucketRegion = core.getInput('bucketRegion', { required: true });
    const distFiles = core.getInput('distFiles', { required: true });

    const s3Url = `s3://${bucket}`;
    exec.exec(`aws s3 sync ${distFiles} ${s3Url} --region ${bucketRegion}`);

    const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;
    core.setOutput('websiteUrl', websiteUrl);

}

run();

