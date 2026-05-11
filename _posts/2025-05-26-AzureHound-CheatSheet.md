---
title: AzureHound CheatSheet
date: 2025-05-20 10:15 -500
categories:
  - Azure
tags:
  - bloodhound
  - azure
  - cheatsheet
---

List of Cypher queries to help analyze [AzureHound](https://github.com/BloodHoundAD/AzureHound) data. Queries under ‘GUI’ are intended for the [BloodHound](https://github.com/BloodHoundAD/BloodHound) GUI (Settings>Query Debug Mode). Queries under ‘Console’ are intended for the Neo4j console (usually located at [http://localhost:7474](http://localhost:7474/)). Download the ‘Custom Queries’ json file here: [https://github.com/hausec/Bloodhound-Custom-Queries](https://github.com/hausec/Bloodhound-Custom-Queries)

## GUI

**Return All Azure Users that are part of the ‘Global Administrator’ Role**

`MATCH p =(n)-[r:AZGlobalAdmin*1..]->(m) RETURN p`

**Return All On-Prem users with edges to Azure**

``` neo4j 
MATCH  p=(m:User)-[r:AZResetPassword|AZOwns|AZUserAccessAdministrator|AZContributor|AZAddMembers|AZGlobalAdmin|AZVMContributor|AZOwnsAZAvereContributor]->(n) WHERE m.objectid CONTAINS 'S-1-5-21' RETURN p
```

**Find all paths to an Azure VM**

`MATCH p = (n)-[r]->(g:AZVM) RETURN p`

**Find all paths to an Azure KeyVault**

`MATCH p = (n)-[r]->(g:AZKeyVault) RETURN p`

**Return All Azure Users and their Groups**

`MATCH p=(m:AZUser)-[r:MemberOf]->(n) WHERE NOT m.objectid CONTAINS 'S-1-5' RETURN p`

**Return All Azure AD Groups that are synchronized with On-Premise AD**

`MATCH (n:Group) WHERE n.objectid CONTAINS 'S-1-5' AND n.azsyncid IS NOT NULL RETURN n`

**Find all Privileged Service Principals**

`MATCH p = (g:AZServicePrincipal)-[r]->(n) RETURN p`

**Find all Owners of Azure Applications**

`MATCH p = (n)-[r:AZOwns]->(g:AZApp) RETURN p`

## Console

**Return All Azure Users**

`MATCH (n:AZUser) return n.name`

**Return All Azure Applications**

`MATCH (n:AZApp) return n.objectid`

**Return All Azure Devices**

`MATCH (n:AZDevice) return n.name`

**Return All Azure Groups**

`MATCH (n:AZGroup) return n.name`

**Return all Azure Key Vaults**

`MATCH (n:AZKeyVault) return n.name`

**Return all Azure Resource Groups**

`MATCH (n:AZResourceGroup) return n.name`

**Return all Azure Service Principals**

`MATCH (n:AZServicePrincipal) return n.objectid`

**Return all Azure Virtual Machines**

`MATCH (n:AZVM) return n.name`

**Find All Principals with the ‘Contributor’ role**

`MATCH p = (n)-[r:AZContributor]->(g) RETURN p`