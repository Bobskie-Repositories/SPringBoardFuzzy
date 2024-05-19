import numpy as np
import skfuzzy as fuzz


# Define fuzzy membership functions for each linguistic variable
desirability_membership = {
    'Low': fuzz.trapmf(np.arange(0, 101, 1), [0, 0, 40, 55]),
    'Medium': fuzz.trapmf(np.arange(0, 101, 1), [50, 60, 70, 80]),
    'High': fuzz.trapmf(np.arange(0, 101, 1), [75, 80, 100, 100])
}

feasibility_membership = {
    'Low': fuzz.trapmf(np.arange(0, 101, 1), [0, 0, 40, 55]),
    'Medium': fuzz.trapmf(np.arange(0, 101, 1), [50, 60, 70, 80]),
    'High': fuzz.trapmf(np.arange(0, 101, 1), [75, 80, 100, 100])
}

viability_membership = {
    'Low': fuzz.trapmf(np.arange(0, 101, 1), [0, 0, 40, 55]),
    'Medium': fuzz.trapmf(np.arange(0, 101, 1), [50, 60, 70, 80]),
    'High': fuzz.trapmf(np.arange(0, 101, 1), [75, 80, 100, 100])
}

# Define a function to convert average scores to linguistic variables

# Define fuzzy sets for output variables
output_membership = {
    'Very Low': fuzz.trapmf(np.arange(0, 101, 1), [0, 0, 30, 35]),
    'Low': fuzz.trapmf(np.arange(0, 101, 1), [30, 40, 50, 60]),
    'Medium': fuzz.trapmf(np.arange(0, 101, 1), [50, 60, 70, 80]),
    'High': fuzz.trapmf(np.arange(0, 101, 1), [75, 80, 95, 100]),
    'Very High': fuzz.trimf(np.arange(0, 101, 1), [100, 100, 100])
}

rules = {
    ('Low', 'Low', 'Low'): 'Very Low',
    ('Low', 'Low', 'Medium'): 'Very Low',
    ('Low', 'Low', 'High'): 'Very Low',
    ('Low', 'Medium', 'Low'): 'Very Low',
    ('Low', 'Medium', 'Medium'): 'Low',
    ('Low', 'Medium', 'High'): 'Low',
    ('Low', 'High', 'Low'): 'Very Low',
    ('Low', 'High', 'Medium'): 'Low',
    ('Low', 'High', 'High'): 'Low',
    ('Medium', 'Low', 'Low'): 'Very Low',
    ('Medium', 'Low', 'Medium'): 'Low',
    ('Medium', 'Low', 'High'): 'Low',
    ('Medium', 'Medium', 'Low'): 'Low',
    ('Medium', 'Medium', 'Medium'): 'Medium',
    ('Medium', 'Medium', 'High'): 'High',
    ('Medium', 'High', 'Low'): 'Low',
    ('Medium', 'High', 'Medium'): 'High',
    ('Medium', 'High', 'High'): 'High',
    ('High', 'Low', 'Low'): 'Very Low',
    ('High', 'Low', 'Medium'): 'Low',
    ('High', 'Low', 'High'): 'Low',
    ('High', 'Medium', 'Low'): 'Low',
    ('High', 'Medium', 'Medium'): 'High',
    ('High', 'Medium', 'High'): 'High',
    ('High', 'High', 'Low'): 'Low',
    ('High', 'High', 'Medium'): 'High',
    ('High', 'High', 'High'): 'Very High'
}


def convert_to_linguistic_variable(average_score, membership_functions):
    membership_values = {
        linguistic_var: fuzz.interp_membership(
            np.arange(0, 101, 1), membership_function, average_score)
        for linguistic_var, membership_function in membership_functions.items()
    }
    max_membership_value = max(membership_values.values())
    return next(var for var, value in membership_values.items() if value == max_membership_value)


def transform_values(input_dict):
    transformed_dict = {}
    for key, value in input_dict.items():
        transformed_values = [1 if x >= 4 else 0 for x in value]
        transformed_dict[key] = transformed_values
    return transformed_dict


def calculate_percentage(input_dict):
    percentage_dict = {}
    for key, value in input_dict.items():
        num_ones = sum(1 for x in value if x == 1)
        total_elements = len(value)
        percentage = (num_ones / total_elements) * 100
        percentage_dict[key] = percentage
    return percentage_dict


def average_percentages(percentage_dict):
    criteria = {
        'Desirability': ['Problem', 'Customer Segment', 'Unique Value Proposition', 'Channels'],
        'Feasibility': ['Solution', 'Unfair Advantage', 'Key Metrics'],
        'Viability': ['Revenue Stream', 'Cost Structure']
    }

    averages = {}

    for category, criteria_list in criteria.items():
        total_percentage = 0
        num_criteria = 0

        for criterion in criteria_list:
            if criterion in percentage_dict:
                total_percentage += percentage_dict[criterion]
                num_criteria += 1

        average_percentage = (
            total_percentage / num_criteria) if num_criteria > 0 else 0
        averages[category] = average_percentage

    return averages


def count_criteria(percentage_dict):
    criteria = {
        'Desirability': ['Problem', 'Customer Segment', 'Unique Value Proposition', 'Channels'],
        'Feasibility': ['Solution', 'Unfair Advantage', 'Key Metrics'],
        'Viability': ['Revenue Stream', 'Cost Structure']
    }

    counts = {}

    for category, criteria_list in criteria.items():
        count = sum(
            1 for criterion in criteria_list if criterion in percentage_dict)
        counts[category] = count

    return counts


def convert_to_fuzzy_variables(average_scores):
    linguistic_variables = {}

    for variable, score in average_scores.items():
        if variable == 'Desirability':
            linguistic_variables[variable] = convert_to_linguistic_variable(
                score, desirability_membership)
        elif variable == 'Feasibility':
            linguistic_variables[variable] = convert_to_linguistic_variable(
                score, feasibility_membership)
        elif variable == 'Viability':
            linguistic_variables[variable] = convert_to_linguistic_variable(
                score, viability_membership)

    return linguistic_variables

# Define a function for fuzzy inference using Mamdani min-max method


def fuzzy_inference(desirability, feasibility, viability):
    desirability_mf = {key: fuzz.interp_membership(np.arange(0, 101, 1), membership_function, desirability)
                       for key, membership_function in desirability_membership.items()}
    feasibility_mf = {key: fuzz.interp_membership(np.arange(0, 101, 1), membership_function, feasibility)
                      for key, membership_function in feasibility_membership.items()}
    viability_mf = {key: fuzz.interp_membership(np.arange(0, 101, 1), membership_function, viability)
                    for key, membership_function in viability_membership.items()}

    # Apply fuzzy rules
    rules = {
        ('Low', 'Low', 'Low'): 'Very Low',
        ('Low', 'Low', 'Medium'): 'Very Low',
        ('Low', 'Low', 'High'): 'Very Low',
        ('Low', 'Medium', 'Low'): 'Very Low',
        ('Low', 'Medium', 'Medium'): 'Low',
        ('Low', 'Medium', 'High'): 'Low',
        ('Low', 'High', 'Low'): 'Very Low',
        ('Low', 'High', 'Medium'): 'Low',
        ('Low', 'High', 'High'): 'Low',
        ('Medium', 'Low', 'Low'): 'Very Low',
        ('Medium', 'Low', 'Medium'): 'Low',
        ('Medium', 'Low', 'High'): 'Low',
        ('Medium', 'Medium', 'Low'): 'Low',
        ('Medium', 'Medium', 'Medium'): 'Medium',
        ('Medium', 'Medium', 'High'): 'High',
        ('Medium', 'High', 'Low'): 'Low',
        ('Medium', 'High', 'Medium'): 'High',
        ('Medium', 'High', 'High'): 'High',
        ('High', 'Low', 'Low'): 'Very Low',
        ('High', 'Low', 'Medium'): 'Low',
        ('High', 'Low', 'High'): 'Low',
        ('High', 'Medium', 'Low'): 'Low',
        ('High', 'Medium', 'Medium'): 'High',
        ('High', 'Medium', 'High'): 'High',
        ('High', 'High', 'Low'): 'Low',
        ('High', 'High', 'Medium'): 'High',
        ('High', 'High', 'High'): 'Very High'
    }

    # Apply fuzzy inference
    aggregated = np.zeros_like(np.arange(0, 101, 1))
    for key, output_label in rules.items():
        activation_level = np.fmin(
            np.fmin(desirability_mf[key[0]], feasibility_mf[key[1]]), viability_mf[key[2]])
        output_mf = output_membership[output_label]
        aggregated = np.fmax(aggregated, np.fmin(activation_level, output_mf))

    # Defuzzify using centroid method
    defuzzified_value = fuzz.defuzz(
        np.arange(0, 101, 1), aggregated, 'centroid')
    return defuzzified_value
