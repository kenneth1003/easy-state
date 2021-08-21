const Confirm = require('prompt-confirm');
const { execSync } = require('child_process');
const prompt = new Confirm({
  name: 'chocolate',
  message: 'Are you sure to update above?',
});

// Production
function dryrun() {
  execSync(`rsync -avh build ubuntu@aws1:/home/ubuntu/easy-state --delete-after --dry-run`, {stdio: 'inherit'})
}
function gogo() {
  execSync(`rsync -avh build ubuntu@aws1:/home/ubuntu/easy-state --delete-after`, {stdio: 'inherit'})
}

// Staging

dryrun()

prompt
  .run()
  .then(function(answer) {
    if (answer) {
      gogo()
    }
  })