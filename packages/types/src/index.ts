// Placeholder domain types — fleshed out in WU-02.
// Do not use these stubs in product code; await WU-02.

/** Branded type for Ethereum hex strings */
export type Hex = `0x${string}`;

/** Branded type for checksummed Ethereum addresses */
export type Address = `0x${string}`;

/** Placeholder: Vote domain type — full definition in WU-02 */
export type Vote = {
  id: string;
};

/** Placeholder: Ballot domain type — full definition in WU-02 */
export type Ballot = {
  voteId: string;
  nullifierHash: Hex;
};

/** Placeholder: Option domain type — full definition in WU-02 */
export type Option = {
  id: string;
  voteId: string;
  label: string;
};

/** Placeholder: Issuer domain type — full definition in WU-02 */
export type Issuer = {
  id: string;
};

/** Placeholder: Nullifier branded type */
export type Nullifier = Hex;

/** Placeholder: Proof — full definition in WU-09 */
export type Proof = Record<string, unknown>;

/** Placeholder: Eligibility — full definition in WU-02 */
export type Eligibility = Record<string, unknown>;
