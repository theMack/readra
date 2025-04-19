// setupTests.js
import { vi } from "vitest";
import "@testing-library/jest-dom";

// Make vi available as global jest
global.jest = vi;
