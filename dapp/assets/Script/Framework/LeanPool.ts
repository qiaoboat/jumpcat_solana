export class LeanPool {
    private static m_poolCache = {};

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static GetPool(item: cc.Prefab | any): cc.NodePool {
        let result = LeanPool.m_poolCache[item];
        if (!result) {
            result = new cc.NodePool();
            LeanPool.m_poolCache[item] = result;
        }
        return result;
    }

    public static Spawn(item: cc.Prefab, parent?: cc.Node): cc.Node {
        if (item == null) return null;
        const pool = LeanPool.GetPool(item);
        let result: cc.Node = null;

        if (pool.size() > 0) {
            result = pool.get();
        } else {
            result = cc.instantiate(item);
        }

        if (parent) result.parent = parent;
        return result;
    }

    public static Despawn(item: cc.Node): void {
        if (item == null) return;
        const pool = LeanPool.GetPool(item);
        pool.put(item);
    }
}
