#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define NB_NB 12
#define LEN_NB 5

unsigned int numbers[NB_NB] = {0};

void calc_sums(unsigned int *arr, int *summs, size_t arr_len) {
    int i = 0;
    memset(summs, 0, sizeof(int) * arr_len);
    while (i < arr_len) {
        int k = 0;
        while (k < LEN_NB) {
            printf("%d %d %d %d\n", arr[k], arr[k] & (0x1 << (LEN_NB - 1 - k)), k, i);
            if (arr[k] & (0x1 << (LEN_NB - 1 - k)))
                summs[i]++;
            else
                summs[i]--;
            k++;
        }
        i++;
    }
}

unsigned int get_report(int invert) {
    int i = 0;
    int cp_numbers[NB_NB];
    int summs[NB_NB];
    memcpy(cp_numbers, numbers, sizeof(unsigned int) * NB_NB);
    int cp_numbers_size = NB_NB;
    int buffers[NB_NB] = {0};
    while (i < LEN_NB) {
        int j = 0;
        int k = 0;
        calc_sums(cp_numbers, summs, cp_numbers_size);
        while (k < cp_numbers_size) {
            if (!invert && cp_numbers[k] & 1 << (LEN_NB - 1 - i) == summs[i] >= 0
              || invert && cp_numbers[k] & 1 << (LEN_NB - 1 - i) == summs[i] <= 0) {
                buffers[j] = cp_numbers[k];
                j++;
            }
            k++;
        }
        if (j == 0)
            return buffers[0];        
        cp_numbers_size = j;
        memcpy(cp_numbers, buffers, sizeof(unsigned int) * cp_numbers_size);
        i++;
    }
    exit(1);
}

int main() {
    FILE *fd = fopen("test", "r");

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
    printf("%u\n", get_report(0));
}