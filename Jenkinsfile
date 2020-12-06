pipeline {
    agent any
    stages {
        // stage('Cloning Git') {
        //   steps{
        //         echo "========Git Repo Cloning...========"
        //         git 'https://github.com/gokalpaltun/swe573-gokalp-altun.git'
        //   }
        // }
        stage("Compose down all containers and remove all") {
            steps {
                echo "========Down compose...========"
                script{
                    sh "docker-compose down"
                }
            }
        }
        stage("Build all containers with new Image and up with compose"){
            steps{
                script{
                    try {
                        sh "docker-compose build"
                        sh "docker-compose up"
                    } catch (Exception e) {
                        echo 'Exception occurred: ' + e.toString()
                    }
                }
            }
        }
        stage('Cleaning up the mess') { 
            steps { 
                script {
                    try {
                        sh "docker system prune -f" 
                    }
                    catch (Exception e) {
                        echo 'Exception occurred: ' + e.toString()
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Sending success message to Discord'
            discordSend successful: true,
                        title: "dev",
                        description: "success",
                        footer: "This build succeeded within ${currentBuild.durationString}",
                        link: env.RUN_DISPLAY_URL,
                        webhookURL: "https://discord.com/api/webhooks/771862129992007701/pAy2Oa9lS0Y8HgaeOIawa0S-C8ksEF7eG0MLA-aVF8YiK10MRNwMTifj_P5BS5s6sZr7"
        }

        failure {
            echo 'Sending failure message to Discord'
            discordSend successful: false,
                        title: "dev",
                        description: "failure",
                        footer: "This build failed after ${currentBuild.durationString}",
                        link: env.RUN_DISPLAY_URL,
                        webhookURL: "https://discord.com/api/webhooks/771862129992007701/pAy2Oa9lS0Y8HgaeOIawa0S-C8ksEF7eG0MLA-aVF8YiK10MRNwMTifj_P5BS5s6sZr7"
        }
    } // post
}