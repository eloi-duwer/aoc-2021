#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define NB_NB 1000
#define LEN_NB 12

unsigned int numbers[NB_NB] = {0};

int calc_sum(unsigned int *arr, size_t arr_len, int column) {
    int i = 0;
	int ret = 0;
    while (i < arr_len) {
		if (arr[i] & (0x1 << (LEN_NB - 1 - column)))
			ret++;
		else
			ret--;
		i++;
    }
	return (ret);
}

unsigned int get_report(int invert) {
    int i = 0;
    int cp_numbers[NB_NB];
    memcpy(cp_numbers, numbers, sizeof(unsigned int) * NB_NB);
    int cp_numbers_size = NB_NB;
    int buffers[NB_NB] = {0};
    while (i < LEN_NB) {
        int j = 0;
        int k = 0;
        int sum_column = calc_sum(cp_numbers, cp_numbers_size, i);
		printf("Sum col %d %d\n", i, sum_column);
        while (k < cp_numbers_size) {
			if (invert == 0) {
				if ((cp_numbers[k] >> (LEN_NB - 1 - i) & 0x1) == (sum_column >= 0)) {
					buffers[j] = cp_numbers[k];
                	j++;
				}
			} else if (invert != 0) {
				// printf("i %d k %d nb %d sum %d %d\n", i, k, cp_numbers[k], sum_column, (cp_numbers[k] >> (LEN_NB - 1 - i) & 0x1));
				if ((cp_numbers[k] >> (LEN_NB - 1 - i) & 0x1) == (sum_column < 0)) {
					buffers[j] = cp_numbers[k];
                	j++;
				}
			}
            k++;
        }
		printf("End loop %d\n", j);
        if (j == 1) {
            return buffers[0];        
		}
        cp_numbers_size = j;
        memcpy(cp_numbers, buffers, sizeof(unsigned int) * cp_numbers_size);
        i++;
    }
    exit(1);
}

int main() {
    FILE *fd = fopen("input", "r");

    char *line = NULL;
    size_t size = 0;
    int n = 0;

    while (getline(&line, &size, fd) > 0) {
        int i = 0;
        while (i < LEN_NB) {
            numbers[n] <<= 1;
            numbers[n] |= (line[i] == '1');
            i++;
        }
        n++;
    }
    printf("%u\n", get_report(0) * get_report(1));
}
