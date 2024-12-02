// Quine-McCluskey Method
export default function getBooleanExpression(truthTable) {
    const variables = Object.keys(truthTable[0]).filter((key) => key !== "Out");

    // Step 1: Extract minterms where Out = 1
    const minterms = truthTable
        .filter((row) => row["Out"] === 1)
        .map((row) => variables.map((key) => row[key]).join(""));

    // check if all outputs are zeros
    if (minterms.length == 0) return "0";
    // check if all outputs are ones
    if (truthTable.length == minterms.length) return "1";

    // Step 2: Group minterms by the number of 1s in their binary representation
    const groups = groupMintermsByOnes(minterms);

    // Step 3: Combine minterms to find prime implicants
    const primeImplicants = findPrimeImplicants(groups);

    // Step 4: Convert prime implicants back to Boolean expression
    const simplifiedExpression = primeImplicants
        .map((implicant) => binaryToExpression(implicant, variables))
        .join(" + ");

    // console.log("Simplified SOP Expression:", simplifiedExpression);

    return simplifiedExpression;
}

// Group minterms by the number of 1s in their binary representation
function groupMintermsByOnes(minterms) {
    const groups = {};
    minterms.forEach((minterm) => {
        const onesCount = minterm.split("").filter((bit) => bit === "1").length;
        if (!groups[onesCount]) groups[onesCount] = [];
        groups[onesCount].push(minterm);
    });
    return groups;
}

// Combine minterms to find prime implicants
function findPrimeImplicants(groups) {
    const newGroups = {};
    const used = new Set();
    let primeImplicants = [];

    const groupKeys = Object.keys(groups)
        .map(Number)
        .sort((a, b) => a - b);

    for (let i = 0; i < groupKeys.length - 1; i++) {
        const groupA = groups[groupKeys[i]];
        const groupB = groups[groupKeys[i + 1]];

        groupA.forEach((a) => {
            groupB.forEach((b) => {
                const diff = diffBits(a, b);
                if (diff.count === 1) {
                    const combined = combineMinterms(a, b, diff.index);
                    used.add(a);
                    used.add(b);

                    const onesCount = combined
                        .split("")
                        .filter((bit) => bit === "1").length;
                    if (!newGroups[onesCount]) newGroups[onesCount] = [];
                    if (!newGroups[onesCount].includes(combined)) {
                        newGroups[onesCount].push(combined);
                    }
                }
            });
        });
    }

    // Add unused minterms to prime implicants
    Object.values(groups)
        .flat()
        .forEach((minterm) => {
            if (!used.has(minterm)) primeImplicants.push(minterm);
        });

    // Recursively process new groups
    if (Object.keys(newGroups).length > 0) {
        primeImplicants = primeImplicants.concat(
            findPrimeImplicants(newGroups)
        );
    }

    return primeImplicants;
}

// Find bit difference between two minterms
function diffBits(a, b) {
    let count = 0;
    let index = -1;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            count++;
            index = i;
        }
    }
    return { count, index };
}

// Combine two minterms by replacing differing bit with '-'
function combineMinterms(a, b, index) {
    return a.slice(0, index) + "-" + a.slice(index + 1);
}

// Convert binary implicant to Boolean expression
function binaryToExpression(implicant, variables) {
    return implicant
        .split("")
        .map((bit, index) => {
            if (bit === "1") return variables[index];
            if (bit === "0") return `!${variables[index]}`;
            return "";
        })
        .filter(Boolean)
        .join("");
}
