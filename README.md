# ChemCaravan

<b>Development Notes</b>
Each location is allowed to have exactly one `service` available. A `service` is a special, settlement-specific page.
Each service must be defined in `SettlementService` and consists of a `name` and a `component`. The `component` must
match the class name of the associated `Page` for that service.
If a settlement does not offer a `service`, the field should be marked `null` in order to be properly ignored.
