#!/usr/bin/env groovy
pipeline {
    agent any
    environment {
        AWS_ACCESS_KEY_ID = credentials('AWS_ACCESS_KEY_ID')
        AWS_SECRET_ACCESS_KEY = credentials('AWS_SECRET_ACCESS_KEY')
        AWS_DEFAULT_REGION = "us-east-1"
    }
    stages {
        stage("Git Clone") {
            steps {
                git credentialsId: 'GITHUB_CREDENTIALS', url: 'https://github.com/truongtrungtinh/jenkins-pipeline-ecr-eks.git', branch: 'master' 
            }
        }
        
        stage('Build and Push to ECR') {
            steps {
                script {
                    sh "aws ecr get-login-password --region us-east-1 | sudo docker login --username AWS --password-stdin 686317197365.dkr.ecr.us-east-1.amazonaws.com"
                    sh "docker build -t natours ."
                    sh "docker tag natours:latest 686317197365.dkr.ecr.us-east-1.amazonaws.com/natours:latest"
                    sh "docker push 686317197365.dkr.ecr.us-east-1.amazonaws.com/natours:latest"
                }
            }
        }
        
        stage("Deploy to EKS") {
            steps {
                script {
                    dir('kubernetes') {
                        sh "aws eks update-kubeconfig --name natours-eks-cluster"
                        sh "kubectl apply -f ./kubernetes/deployment.yaml"
                        sh "kubectl apply -f ./kubernetes/service.yaml"
                    }
                }
            }
        }
    }
}
