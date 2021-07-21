<!--
    Written in the format prescribed by https://github.com/Financial-Times/runbook.md.
    Any future edits should abide by this format.
-->
# Origami Navigation Service Data

Provides the data consumed via origami-navigation-service

## Code

origami-navigation-service-data

## Service Tier

Platinum

## Lifecycle Stage

Production

## Primary URL

https://origami-navigation-data.in.ft.com/v2/navigation.json

## Host Platform

Fastly

## Contains Personal Data

No

## Contains Sensitive Data

No

## Can Download Personal Data

No

## Can Contact Individuals

No

## Failover Architecture Type

ActiveActive

## Failover Process Type

FullyAutomated

## Failback Process Type

FullyAutomated

## Data Recovery Process Type

Manual

## Release Process Type

FullyAutomated

## Rollback Process Type

FullyAutomated

## Key Management Process Type

Manual

## Architecture

The navigation data lives as YAML in the service's GitHub repository. Data is modified through the GitHub interface. When a change lands on the `master` branch, it is converted to JSON in CI, and then uploaded to Fastly.

## More Information

<https://github.com/Financial-Times/origami-navigation-data>

## First Line Troubleshooting

There are a few things you can try before contacting the Origami team:

1.  Check that the navigation data is accessible via the web, [this URL](https://origami-navigation-data.in.ft.com/v2/links.json) should return a `200` response

## Second Line Troubleshooting

If the application is failing entirely, you'll need to check a couple of things:

1.  Did a deployment just happen (a commit on `master`)? If so, roll it back to bring the service back up (hopefully)
2.  Is the CI job which uploads the data running correctly? And is the Fastly key up-to-date?

## Monitoring

This service is a Fastly service which has no backend/origin. It doesn't currently have a `__health` endpoint, it would only ever be offline if Fastly or Dyn go offline.

<!-- Placeholder - remove HTML comment markers to activate
## Failover Details
Enter descriptive text satisfying the following:
The actions required to fail this system from one region to another. Either provide a set of numbered steps or a link to a detailed process that operations can follow.

...or delete this placeholder if not applicable to this system
-->

## Data Recovery Details

We recover data by rolling back Git commits and pushing changes to the `master` branch.

## Release Details

This service is released whenever a new commit appears on the `master` branch of the GitHub repo. It's released by a CI job which validates the new navigation data and uploads it to Fastly.

## Key Management Details

The only key used by this system is an Fastly API key. This key has read/write access to a single Fastly service. We rotate this key manually.

<!-- Placeholder - remove HTML comment markers to activate
## Heroku Pipeline Name
Enter descriptive text satisfying the following:
This is the name of the Heroku pipeline for this system. If you don't have a pipeline, this is the name of the app in Heroku. A pipeline is a group of Heroku apps that share the same codebase where each app in a pipeline represents the different stages in a continuous delivery workflow, i.e. staging, production.

...or delete this placeholder if not applicable to this system
-->