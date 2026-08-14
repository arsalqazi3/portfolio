# 0001: No Terraform for a single VM

## Status
Accepted

## Context
This site runs on one Oracle Cloud compute instance. Terraform (or any
IaC tool) earns its keep when there's a graph of resources — networking,
multiple instances, load balancers, IAM policies — that benefit from being
declared, diffed, and versioned together.

## Decision
Provision the VM by hand through the Oracle Cloud console. No Terraform
config exists for this project.

## Consequences
- One less tool to maintain, and no state file to manage or lose.
- Recreating the VM from scratch means re-doing a few manual console
  clicks, not `terraform apply`. Acceptable for a single instance.
- This doesn't generalize: the moment there's more than one resource to
  provision, this decision should be revisited. That's already the plan for
  the Chaos-Driven Reliability Platform project, which provisions multiple
  resources on Kubernetes and is a legitimate case for Terraform.
