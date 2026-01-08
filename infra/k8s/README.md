# Kubernetes Infrastructure

Kubernetes manifests for deploying Bills.ai on GKE or any Kubernetes cluster.

## Files

- `api.yaml` - API Gateway deployment and service
- `ocr.yaml` - OCR service deployment with HPA
- `llm.yaml` - LLM service deployment with HPA
- `postgres.yaml` - PostgreSQL deployment (for dev/testing)

## Prerequisites

- Kubernetes cluster (GKE recommended)
- kubectl configured
- Docker images pushed to container registry

## Deployment

### 1. Create namespace (optional)

```bash
kubectl create namespace bills-ai
```

### 2. Update image references

Replace `PROJECT_ID` in all YAML files with your GCP project ID:

```bash
sed -i 's/PROJECT_ID/your-gcp-project-id/g' *.yaml
```

### 3. Create secrets

```bash
kubectl apply -f postgres.yaml
```

Update the secrets with actual values:

```bash
kubectl create secret generic bills-ai-secrets \
  --from-literal=database-url="postgresql://user:pass@host:5432/db" \
  --from-literal=jwt-secret="your-secret-key"
```

### 4. Deploy services

```bash
kubectl apply -f ocr.yaml
kubectl apply -f llm.yaml
kubectl apply -f api.yaml
```

### 5. Verify deployments

```bash
kubectl get pods
kubectl get services
kubectl get hpa
```

## Production Considerations

### Database

For production, use Cloud SQL instead of the PostgreSQL deployment:

1. Create Cloud SQL instance
2. Update DATABASE_URL secret
3. Use Cloud SQL Proxy sidecar or private IP

### Autoscaling

The manifests include HPA (Horizontal Pod Autoscaler) for OCR and LLM services:

- OCR: 2-10 replicas based on CPU
- LLM: 1-5 replicas based on CPU

Adjust based on your workload.

### Resource Limits

Current resource limits are conservative. Monitor and adjust based on actual usage:

```bash
kubectl top nodes
kubectl top pods
```

### GPU Support

For LLM service with GPU:

1. Ensure GKE cluster has GPU nodes
2. Uncomment GPU resource limits in `llm.yaml`
3. Install NVIDIA device plugin

### Monitoring

Set up monitoring and logging:

```bash
# Enable GKE monitoring
gcloud container clusters update CLUSTER_NAME \
  --enable-cloud-logging \
  --enable-cloud-monitoring
```

## Troubleshooting

### Check pod logs

```bash
kubectl logs -f deployment/bills-ai-api
kubectl logs -f deployment/ocr-service
kubectl logs -f deployment/llm-service
```

### Check pod status

```bash
kubectl describe pod POD_NAME
```

### Test services internally

```bash
kubectl run -it --rm debug --image=curlimages/curl --restart=Never -- sh
# Inside the pod:
curl http://ocr-service:8001/health
curl http://llm-service:8002/health
curl http://bills-ai-api/health
```

## Cleanup

```bash
kubectl delete -f api.yaml
kubectl delete -f ocr.yaml
kubectl delete -f llm.yaml
kubectl delete -f postgres.yaml
```
