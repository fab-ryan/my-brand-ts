"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skillSchema = exports.educationSchema = exports.projectSchema = exports.categoryQuerySchema = exports.categorySchema = void 0;
const zod_1 = require("zod");
exports.categorySchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: 'Category name is required and should be a string',
    })
        .nonempty(),
});
exports.categoryQuerySchema = zod_1.z.object({
    status: zod_1.z.string().optional(),
});
exports.projectSchema = zod_1.z.object({
    title: zod_1.z
        .string({
        required_error: 'Project title is required and should be a string',
    })
        .nonempty(),
    description: zod_1.z
        .string({
        required_error: 'Project description is required and should be a string',
    })
        .nonempty(),
    category: zod_1.z.string({
        required_error: 'Project category is required and should be a string',
    }),
    url: zod_1.z
        .string({
        required_error: 'Project url is required and should be a string',
    })
        .nonempty(),
    status: zod_1.z.boolean().optional(),
});
exports.educationSchema = zod_1.z.object({
    institution: zod_1.z
        .string({
        required_error: 'School name is required and should be a string',
    })
        .nonempty(),
    degree: zod_1.z
        .string({
        required_error: 'Degree name is required and should be a string',
    })
        .nonempty(),
    field: zod_1.z
        .string({
        required_error: 'Field name is required and should be a string',
    })
        .nonempty(),
    start: zod_1.z
        .string({
        required_error: 'Start year is required and should be a string',
    })
        .nonempty(),
    end: zod_1.z
        .string({
        required_error: 'End year is required and should be a string',
    })
        .nonempty(),
    description: zod_1.z.string().optional(),
    status: zod_1.z.boolean().optional(),
});
exports.skillSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: 'Skill name is required and should be a string',
    })
        .nonempty(),
    percent: zod_1.z
        .number({
        required_error: 'Skill percentage is required and should be a number',
    })
        .int()
        .min(1, 'Skill percentage should be between 1 and 100')
        .max(100, 'Skill percentage should be between 1 and 100'),
    status: zod_1.z.boolean().optional(),
});
