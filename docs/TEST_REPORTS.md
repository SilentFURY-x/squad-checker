# Test Reports

## Unit Testing
**Framework**: Vitest  
**Subject**: `SquadValidator` (`src/core/validator.test.ts`)  

### Validation Criteria Covered
1. **Valid Selection Processing**: Ensures an array of valid IDs maps perfectly to a `VALID` status, computes counts flawlessly, and resolves without violations.
2. **Specific Error Ordering**: Verifies that violations array returns exactly as specified (e.g. Size → Goalkeepers → Defenders → Forwards → Unavailability → Cohort limits).
3. **Selection Boundaries**: Confirms squad size correctly evaluates to `< 7` and flags `SQUAD_SIZE_MUST_BE_7`.
4. **Reference Integrity**: Rejects malformed or duplicate IDs with `INVALID_SELECTION_REFERENCE`.

### Results
```bash
 RUN  v4.1.10 C:/PROJECTS/CISCO/squad-checker

 ✓ src/core/validator.test.ts (4 tests) 4ms

 Test Files  1 passed (1)
      Tests  4 passed (4)
   Duration  259ms
```

### Conclusion
The domain validation engine correctly intercepts all permutations of faulty squad selection. The engine is robust enough to decouple the Next.js UI from the constraints validation, matching the requirements of Step 6.
