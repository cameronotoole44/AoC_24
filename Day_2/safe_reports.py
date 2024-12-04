# the report is safe if the levels are strictly increasing or decreasing, any two adjacent levels differ by at least one and at most 3. create the function that checks if report is safe
# make each line into a list of integers? or array?

def is_safe_report(report):

    if len(report) < 5 or len(report) > 8:
        return False
    
    increasing = all(
        0 < report[i+1] - report[i] <= 3 
        for i in range(len(report) - 1)
    )
    
    decreasing = all(
        0 < report[i] - report[i+1] <= 3 
        for i in range(len(report) - 1)
    )
    
    return increasing or decreasing

def count_safe_reports(filename):
    safe_count = 0
    total_reports = 0
    
    with open(filename, 'r') as file:
        for line in file:

            try:
                report = [int(level) for level in line.strip().split()]
                total_reports += 1
                
                if 5 <= len(report) <= 8:
                    if is_safe_report(report):
                        safe_count += 1
            except ValueError:

                continue
    
    print(f"Total reports processed: {total_reports}")
    print(f"Safe reports: {safe_count}")
    return safe_count

safe_count = count_safe_reports('reports.txt')
print(f"Number of safe reports: {safe_count}")