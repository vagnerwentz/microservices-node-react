<h1>Microservices with Node.JS and React.JS</h1>

<h2>Pods</h2>

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: posts
spec:
  containers:
    - name: posts
      image: services/posts:0.0.1
```

<h3>K8S Pods Commands</h3>

```bash
kubectl get pods - Print out information about all of the running pods

kubectl exec -it [pod_name] [cmd] - Execute the given command in a running pod

kubectl logs [pod_name] - Print out logs from the given pod

kubectl delete pod [pod_name] - Deletes the given pod

kubectl apply -f [config file name] - Tells kubernetes to process the config

kubectl describe pod [pod_name] - Print out some information about the running pod
```

```bash
$ vagner.wentz in blog/infra/k8s
kubectl apply -f posts.yaml
pod/posts created

kubectl get pods
NAME  READY   STATUS    RESTARTS   AGE
posts 1/1     Running   0          18s

kubectl delete pod posts  
pod "posts" deleted
```

<h2>Deployment</h2>

```yaml
apiVersion: apps/v1
kind: Deployment
metadata: 
  name: posts-depl
spec:
  replicas: 1
  selector: 
    matchLabels:
      app: posts
  template:
    metadata:
      labels:
        app: posts
    spec:
      containers:
        - name: posts
          image: services/posts:0.0.1
```

<h3>K8S Deploy Commands</h3>

```bash
kubectl get deployments - List all the running deployments

kubectl describe deployment [depl name] - Print out details about a specific deployment

kubectl apply -f [config file name] - Create a deployment out of a config file

kubectl delete deployment [delp name] - Delete a deployment and all associated pods

kybectl get pods - Will show the pods created by the deployment

kubectl delete pods [pod created by deployment] - Will delete the pod but will recreate another
```

```bash
$ vagner.wentz in blog/infra/k8s
kubectl apply -f posts-depl.yaml
deployment.apps/posts-depl created

kubectl get deployments 
NAME         READY   UP-TO-DATE   AVAILABLE   AGE
posts-depl   1/1     1            1           18m

kubectl get pods       
NAME                          READY   STATUS    RESTARTS   AGE
posts-depl-684447f94c-qk59w   1/1     Running   0          19m
```
