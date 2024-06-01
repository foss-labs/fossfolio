function exclude<K, Key extends keyof K>(k: K, keys: Key[]): Omit<K, Key> {
	for (const key of keys) {
		delete k[key];
	}
	return k;
}

export default exclude;
