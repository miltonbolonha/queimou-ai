const fs = require("fs-extra");
const path = require("path");
const cron = require("./cron");

async function schedulingPosts(scheduledPosts) {
  if (!scheduledPosts) return console.log("❌ [Scheduled JSON]: load ERROR.");
  // Limpa os arquivos antigos antes de criar novos?
  await scheduledPosts?.forEach(async (post) => {
    if (new Date(post.date) > new Date()) {
      return await createNetlifyBuildYML(post.date);
    }
  });
}

async function createNetlifyBuildYML(postDate) {
  const dateObj = new Date(postDate);
  const cronSchedule = `${dateObj.getUTCMinutes()} ${dateObj.getUTCHours()} ${dateObj.getUTCDate()} ${
    dateObj.getUTCMonth() + 1
  } *`;
  const dateString = dateObj.toISOString().split("T")[0]; // YYYY-MM-DD
  const filePath = path.join(
    __dirname,
    "../../../../../.github/workflows/netlify-build-" + dateString + ".yml"
  );
  const version = require("../../../../../content/settings/version.json");
  // Verificar se o arquivo já existe
  if (fs.existsSync(filePath)) {
    console.log(
      `✔️ [CRON JOB]: file ${postDate} already exists; Skipping creation.`
    );

    return null;
  }

  try {
    const ymlContent = cron(cronSchedule, version);
    fs.writeFileSync(filePath, ymlContent);
    console.log(`✔️ [CRON JOB]: stored successfully. file ${postDate}.`);
  } catch (error) {
    console.log(error);
    console.log(`❌ [CRON JOB]: ERROR. file ${postDate}.`);
    return process.exit(1);
  }
}

function cleanOldBuildYMLFiles(workflowDir) {
  const files = fs.readdirSync(workflowDir);
  const buildFiles = files.filter((file) => file.startsWith("netlify-build-"));

  const now = new Date();
  const todayString = now.toISOString().split("T")[0];

  buildFiles.forEach((file) => {
    const datePart = file.match(/netlify-build-(\d{4}-\d{2}-\d{2})\.yml/);
    if (datePart) {
      const buildDate = datePart[1];
      if (buildDate < todayString) {
        // Compara a data do arquivo com a data de hoje
        const filePath = path.join(workflowDir, file);
        try {
          fs.unlinkSync(filePath);
          console.log(`Deleted old workflow file: ${file}`);
        } catch (error) {
          console.log(error);
          console.error(`Error deleting file ${file}`, error);
        }
      }
    }
  });
}

module.exports = {
  createNetlifyBuildYML,
  cleanOldBuildYMLFiles,
  schedulingPosts,
};
