# ChemCaravan

<p>Chem Caravan is a mobile game for Android and iOS made using the Ionic 2 framework. The game itself is a reimagining (knock-off) of [Dope Wars] (http://www.drunkmenworkhere.org/185.php). The player is given a small amount of caps (currency) to start as a loan. They then must navigate their way between settlements, buying and selling chems to earn a profit , pay back their loan, and then try to get rich. There are random events that happen when travelling, such as being mugged, finding chems on the ground, or being attacked by raiders. See in-game instructions for more detailes.</p>

<b>Development Notes</b>
<p>Each location is allowed to have exactly one `service` available. A `service` is a special, settlement-specific page.
Each service must be defined in `SettlementService` and consists of a `name` and a `component`. The `component` must
match the class name of the associated `Page` for that service.</p>
<p>If a settlement does not offer a `service`, the field should be marked `null` in order to be properly ignored.</p>
