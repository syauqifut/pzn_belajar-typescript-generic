describe('generic', () => {

    class GenericData<T> {
        value: T;

        constructor(value: T) {
            this.value = value;
        }

        get(): T {
            return this.value;
        }

        set(value: T) {
            this.value = value;
        }
    }

    it('should support multiple data type', async () => {
        const dataNumber = new GenericData<number>(123);
        // dataNumber.value = "eko"; // error
        // dataNumber.value = true; // error
        expect(dataNumber.value).toBe(123);

        const dataString = new GenericData<string>("Mul");
        // dataString.value = 123; // error
        // dataString.value = true; // error
        const upper = dataString.value.toUpperCase();
        expect(upper).toBe("MUL");
    });

    function create<T>(value: T): T {
        return value;
    }

    it('should support function generic', async () => {
        const result: string = create<string>("Joni");
        expect(result).toBe("Joni");

        const result2: number = create<number>(123);
        expect(result2).toBe(123);
    });

    class Entry<K, V> {
        constructor(public key: K, public value: V) {
        }
    }

    class Triple<K, V, T> {
        constructor(public first: K, public second: V, public third: T) {
        }
    }

    it('should support multiple generic type', async () => {
        const entry = new Entry<number, string>(1, "Hello");
        expect(entry.key).toBe(1);
        expect(entry.value).toBe("Hello");

        const triple = new Triple<number, string, boolean>(1, "Hello", true);
        expect(triple.first).toBe(1);
        expect(triple.second).toBe("Hello");
        expect(triple.third).toBe(true);
    });

    it('should support optional generic type', async () => {
        const entry = new Entry(1, "Hello");
        // entry.key = "Hello"; //error
        expect(entry.key).toBe(1);
        expect(entry.value).toBe("Hello");
    });

    class SimpleGeneric<T = number> {
        private value?: T;

        setValue(value: T) {
            this.value = value;
        }

        getValue(): T | undefined {
            return this.value;
        }
    }

    it('should create simple generic', async () => {
        const simple = new SimpleGeneric<string>();
        simple.setValue("EKI");
        // simple.setValue(100);
        // simple.setValue(true);

        expect(simple.getValue()!.toUpperCase()).toBe("EKI");
    });

    interface Employee {
        id: string;
        name: string;
    }

    interface Manager extends Employee {
        totalEmployee: number;
    }

    interface VP extends Manager {
        totalManager: number;
    }

    class EmployeeData<T extends Employee> {
        constructor(public employee: T) {
        }
    }

    it('should support constraint', async () => {
        const data1 = new EmployeeData<Employee>({
            id: "100",
            name: "Syauqi"
        });

        const data2 = new EmployeeData<Manager>({
            id: "100",
            name: "Syauqi",
            totalEmployee: 100
        });

        const data3 = new EmployeeData<VP>({
            id: "100",
            name: "Syauqi",
            totalEmployee: 100,
            totalManager: 10
        });

        // const data4 = new EmployeeData<string>("Syauqi"); // error
        // const data4 = new EmployeeData<number>(100); // error
    });

    it('should support array', async () => {
        const array = new Array<string>();
        array.push("Juni");
        array.push("Junaidi");

        expect(array[0]).toBe("Juni");
        expect(array[1]).toBe("Junaidi");
    });

    it('should support set', async () => {
        const set = new Set<string>();
        set.add("Murin");
        set.add("Karomah");
        set.add("Murin");

        expect(set.size).toBe(2);
        expect(set.has("Murin")).toBe(true);
        expect(set.has("Karomah")).toBe(true);
    });

    it('should support map', async () => {
        const map = new Map<string, number>();
        map.set("Adi", 100);
        map.set("Budi", 96);
        map.set("Cindi", 66);

        expect(map.get("Adi")).toBe(100);
        expect(map.get("Budi")).toBe(96);
        expect(map.get("Cindi")).toBe(66);
    });

    async function fetchData(value: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            setTimeout(() => {
                if(value === "Yanto"){
                    resolve("Hello " + value);
                }else{
                    reject("Not Found");
                }
            }, 1000);
        })
    }

    it('should support promise', async () => {
        const result = await fetchData("Yanto");
        expect(result.toUpperCase()).toBe("HELLO YANTO");

        try {
            await fetchData("Budi");
        }catch (e){
            expect(e).toBe("Not Found");
        }

    });
});